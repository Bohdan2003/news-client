import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCallback, useRef } from 'react';
import * as yup from 'yup'
import { useCreateSlideMutation, useGetSLidesQuery } from '../../api/apiSlice';

import { PreviewImage } from '../previewImage/PreviewImage';

import './adminForm.scss';

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const AdminForm = () => {

    const [ createSlide ] = useCreateSlideMutation();
    const { isFetching : isFetchingList, 
            isError: isErrorList 
          } = useGetSLidesQuery();

    const inputFileRef = useRef(null);

    const selectingFile = useCallback(() => {
        inputFileRef.current.click();
    }, [inputFileRef.current]);

    return (
        <div className="admin-form">
            <Formik
                initialValues={{
                    file: null,
                    descr: ''
                }}
                validationSchema={yup.object({
                    file: yup.mixed()
                        .nullable()
                        .required('Обов\'язкове поле')
                        .test(
                            "FILE_FORMAT",
                            "Вибрано неправильний файл.",
                            (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
                        ),
                    descr: yup.string()
                            .min(5, 'Мінімум 5 символів для заповнення!')
                            .required('Обов\'язкове поле'),
                })}
                onSubmit={(values, {resetForm}) => {   
                    const formData = new FormData();
                    formData.append('file', values.file);
                    formData.append('descr', values.descr);
                    createSlide(formData).unwrap();
                    resetForm();
                }}
            >
               { ({values, setFieldValue}) => (
                    <Form> 
                        <div className="admin-form__box">  
                            <PreviewImage 
                                nameClass="admin-form__img"
                                file={values.file}
                                selectingFile={selectingFile}
                                setFieldValue={setFieldValue}
                                SUPPORTED_FORMATS={SUPPORTED_FORMATS}
                            />
                            <input 
                                ref={inputFileRef}
                                hidden
                                type="file" 
                                accept={SUPPORTED_FORMATS}
                                onInput={(e) => {
                                    if(e.target.files[0]) setFieldValue("file", e.target.files[0])
                                    e.target.value = "";         
                                }}
                            />
                            <ErrorMessage className='error' name="file" component="div"/>                  
                        </div>
    
                        <div className="admin-form__box">
                            <label className='admin-form__label' htmlFor="descr">
                                Опис
                            </label>
                            <Field 
                                as="textarea"
                                className="admin-form__input"
                                type="text" 
                                id="descr" 
                                name="descr" 
                            />
                            <ErrorMessage className="error" name="descr"  component="div" />
                        </div>
                                        
                        <button 
                            disabled={isFetchingList || isErrorList}
                            type="submit"
                            className="admin-form__btnsubmit"
                        >
                            Створити новий слайд
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}