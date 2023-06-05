import { useRef, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEditSlideMutation, useDeleteSlideMutation } from '../../api/apiSlice';
import * as yup from 'yup'

import { PreviewImage } from '../previewImage/PreviewImage';
import { IMAGE_URL } from "../../keys"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const AdminListItem = (props) => {
    const { descr, _id, imgURL } = props.item;
    const { provided } = props;
    const [ editSlide ] = useEditSlideMutation();
    const [ deleteSlide ] = useDeleteSlideMutation();

    const inputFileRef = useRef(null);

    const selectingFile = useCallback(() => {
        inputFileRef.current.click();
    }, [inputFileRef.current]);

    return (
        <li className="admin-list__item" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <Formik
                initialValues={{
                    file: null,
                    descr: descr
                }}
                validationSchema={yup.object({
                    file: yup.mixed()
                        .nullable()
                        .test(
                            "FILE_FORMAT",
                            "Вибрано неправильний файл.",
                            (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
                        ),
                    descr: yup.string()
                            .min(5, 'Мінімум 5 символів для заповнення!')
                            .required('Обов\'язкове поле'),
                })}
                onSubmit={(values, {setFieldValue}) => {     
                    const formData = new FormData();               
                    formData.append('file', values.file);
                    formData.append('descr', values.descr);
                    formData.append('_id', _id);
                    editSlide(formData).unwrap();    
                    setFieldValue('file', null);         
                }}
            >
               { ({values, setFieldValue, resetForm}) => (
                    <Form className='admin-list__item-form'> 
                        <div className="admin-list__box">  
                            <PreviewImage 
                                nameClass="admin-list__img"
                                file={values.file}
                                defaultImg={IMAGE_URL + imgURL}
                                selectingFile={selectingFile}
                                setFieldValue={setFieldValue}
                                SUPPORTED_FORMATS={SUPPORTED_FORMATS}
                            />                       
                            <input 
                                ref={inputFileRef}
                                hidden
                                type="file"
                                accept={SUPPORTED_FORMATS}
                                onChange={e => {
                                    if(e.target.files[0]) setFieldValue("file", e.target.files[0])                      
                                }}
                            />
                            <ErrorMessage className='error' name="file" component="div"/>  
                        </div>
    
                        <div className="admin-list__box">
                            <Field
                                spellCheck="false" 
                                className="admin-list__input"
                                as="textarea"
                                type="text" 
                                id="descr" 
                                name="descr" 
                            />
                            <ErrorMessage className="error" name="descr"  component="div" />
                            <div className={`admin-list__btns ${values.descr == descr && !values.file ? 'admin-list__btns--hidden' : ''}`}>
                                 <input 
                                    className="admin-list__btn-clear"
                                    type="button"
                                    value="Відмінити"
                                    onClick={() => {resetForm()}}
                                />
                                <button 
                                    type="submit"
                                    className="admin-list__btn-submit"
                                >
                                    Оновити
                                </button>
                            </div>
                        </div>
                                        
                       
                    </Form>
                )}
            </Formik>
            <button 
                className="admin-list__btn-delet" 
                onClick={() => {deleteSlide({_id, imgURL})}}
            ></button>
        </li>
    )
}