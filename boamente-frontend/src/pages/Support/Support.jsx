import  React from 'react';
import "../../style.css";
import style from "./Support.module.css";
import ButtonSubmit from '../../components/ButtonSubmit/ButtonSubmit.jsx';
import LabelInput from '../../components/LabelInput/LabelInput.jsx';

export default function Support () {
    return (
        <div className={style.boxSupport}>
            <h2>Envie uma Solicitação de Suportes</h2>
            <form action="">
                <section className={style.formGroup}>
                    <label for="">Assunto 
                        <span className={style.required}>*</span>
                    </label>
                    <LabelInput
                        id="assunto"
                        name="assunto"
                        type="text"
                        placeholder="Digite o assunto da sua solicitação"
                        required={true}
                        showLabel={false}
                        className={style.customInputs}
                    />
                    <div className={style.erro}> 
                        <span className={style.erroAssunto}>Limite de 70 caracteres excedido!</span>
                    </div>

                    <label for="">Descrição 
                        <span className={style.required}>*</span>
                    </label>
                    <LabelInput
                        id="assunto"
                        name="assunto"
                        type="textarea"
                        placeholder="Digite aqui os detalhes..."
                        required={true}
                        showLabel={false}
                        className={`${style.customInputs} ${style.customInputTextarea}`}
                    />
                    <div className={style.erro}> 
                        <span className={style.erroDescricao}>Limite de 500 caracteres excedido!</span> 
                    </div>
                </section>

                <span className={style.legenda}>Enviaremos a resposta da sua solicitação para seu e-mail em breve!</span>
                <ButtonSubmit type="submit"> Enviar Solicitação </ButtonSubmit>
            </form>
        </div>
    );
}