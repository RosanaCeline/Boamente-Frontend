import React from 'react';
import styles from './Home.module.css';
import backgroundImage from '../../assets/images/homepage/apresentacao-background.png'; 

export default function Home () {
    return (
        <main>
            <section className={styles.homepage}
                style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div id={styles.boxApresentacao}>
                    <span>Uma ferramenta para saúde mental</span>
                    <h1>PROJETO BOAMENTE</h1>
                    <a href="/login">
                        <div className={styles.buttonVisualize}> 
                            Visualize os Dashboards
                        </div>
                    </a>
                </div>
            </section>
            <section className={styles.homeAbout}> 
                <h1>SOBRE</h1>
                <p>O Boamente foi criado com o intuito de ser uma ferramenta de auxílio para profissionais de saúde mental (PSM) no monitoramento remoto dos níveis de ideação suícida de seus pacientes. Integrando técnicas de Inteligência Artificial, Processamento de Linguagem Natural e fenotipagem digital.</p>
                <p>Por meio de um teclado virtual instalado no dispositivo do paciente, há a coleta discreta dos textos digitados, e após isso acontece um processo de classificação dos dados, onde são armazenados somente os resultados da classificação e descartados os textos, garantindo a privacidade do usuário.</p>
                <p>Esses resultados são disponibilizados em dashboards intuitivos, permitindo que os PSMs acompanhem em tempo real o estado emocional de seus pacientes e permitindo intervenções precoces e a prevenção do suicídio.</p>
                <p>Este site foi desenvolvido exclusivamente para os profissionais de saúde mental, oferecendo uma ferramenta prática e confiável para potencializar o acompanhamento clínico e melhorar a qualidade da assistência aos pacientes.</p>
            </section>
        </main>
    )
}
