import React from "react";
import style from "./GenericForm.module.css";

export default function GenericForm ({ title, sections = [], footerMessage, buttonLabel = "Enviar", onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <section className={style.formGeneric}>
        <h1 className={style.titlePage}>{title}</h1>
        <form onSubmit={handleSubmit} className={style.formStructure}>
            {sections.map((section, index) => (
                <div key={index} className={style.formSection}>
                    {section.subtitle && (<h2 className={style.subtitle}>{section.subtitle}</h2>)}
                    <div className={style.formGrid}>
                        {section.fields.map((field) => (
                        <article key={field.id} className={style.fieldGeneral}>
                            <label htmlFor={field.id} className={style.labelNameAsking}>{field.label} {field.required && <span className={style.required}>*</span>}</label>
                            {field.type === "select" ? (
                                <select
                                    id={field.id}
                                    name={field.name}
                                    required={field.required}
                                     className={style.formInputSelect}
                                >
                                <option value="">Selecione uma opção</option>
                                    {field.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                        {option.label}
                                        </option>
                                    ))}
                                </select>

                            ) : (
                                <input
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    className={style.formInputField}
                                />
                            )}
                        </article>
                        ))}
                    </div>
                </div>
            ))}

            {footerMessage && (<p className={style.footerMessage}>{footerMessage}</p>)}

            <button type="submit" className={style.buttonSubmit}>{buttonLabel}</button>
        </form>
    </section>
  );
};