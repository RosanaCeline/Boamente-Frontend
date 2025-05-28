import React from "react";
import style from "./GenericForm.module.css";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import LabelInput from "../LabelInput/LabelInput";

export default function GenericForm ({ sections = [], footerMessage, buttonLabel = "Enviar", onSubmit, register, errors}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
    };
    return (
        <section className={style.formGeneric}>
        
        <form onSubmit={handleSubmit} className={style.formStructure} noValidate>
            {sections.map((section, index) => (
            
            <div key={index} className={style.formSection}>
                {section.subtitle && (<h2 className={style.subtitle}>{section.subtitle}</h2>)}
                
                <div className={style.formGrid}>
                    {section.fields.map((field) => (
                        <article key={field.id} className={style.fieldGeneral}>
                            <label htmlFor={field.id} className={style.labelNameAsking}>
                                {field.label} {field.required && <span className={style.required}>*</span>}
                            </label>
                            <LabelInput
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                required={field.required}
                                register={register}
                                options={field.options} 
                            />
                            {errors && errors[field.name] && (
                                <p className={style.error}>{errors[field.name].message || 'Campo obrigatório'}</p>
                            )}
                        </article>
                    ))}
                </div>
            </div>
            ))}

            {footerMessage && <p className={style.footerMessage}>{footerMessage}</p>}

            <ButtonSubmit type="submit">{buttonLabel}</ButtonSubmit>
        </form>
        </section>
    );
};