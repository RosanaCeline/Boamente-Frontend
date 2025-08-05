import React from 'react';
import styles from './Resources.module.css'

export default function Resources() {
    return (
        <main>
            <section className={styles.artigos}>
                <h1>Artigos</h1>
                <p className={styles.descricao}>
                    Abaixo você encontra os artigos criados e utilizados como base para o desenvolvimento do sistema.
                </p>
                <nav className={styles.listagem}>
                    <ResourceCard
                        titulo="Comparative analysis of BERT-based and generative large language models for detecting suicidal ideation: a performance evaluation study"
                        autores={`Autores:\nAdonias Caetano\nRenato Freitas Bessa\nAriel Soares Teles`}
                        link="https://doi.org/10.1590/0102-311XEN028824"
                        textoBotao="Acessar Artigo"
                    />
                    <ResourceCard
                        titulo="Boamente: A Natural Language Processing-Based Digital Phenotyping Tool for Smart Monitoring of Suicidal Ideation"
                        autores={`Autores:\nEvandro J. S. Diniz\nAriel Soares Teles`}
                        link="https://doi.org/10.3390/healthcare10040698"
                        textoBotao="Acessar Artigo"
                    />
                    <ResourceCard
                        titulo="How can machine learning identify suicidal ideation from user’s texts? Towards the explation of the Boamente system"
                        autores={`Autores:\nEvandro J. S. Diniz\nAriel Soares Teles`}
                        link="https://doi.org/10.1016/j.procs.2022.09.093"
                        textoBotao="Acessar Artigo"
                    />
                </nav>
            </section>

            <section className={styles.materiais}>
                <h1>Materiais de Desenvolvimento</h1>
                <p className={styles.descricao}>
                    Abaixo você encontra materiais utilizados durante o desenvolvimento do sistema, como repositórios e ferramentas.
                </p>
                <nav className={styles.listagem}>
                    <ResourceCard
                        titulo="Repositório do Modelo BERT"
                        autores="Última versão - por Adonias Caetano de Oliveira"
                        link="https://github.com/adonias-caetano/Suicidal-Ideation-BERTvsLLM"
                        textoBotao="Acessar Repositório GitHub"
                    />
                    <ResourceCard
                        titulo="Repositório do Teclado Virtual"
                        autores="Última versão - por Rosana Celine Pinheiro Damaceno"
                        link="https://github.com/RosanaCeline/Teclado-Boamente"
                        textoBotao="Acessar Repositório GitHub"
                    />
                    <ResourceCard
                        titulo="Repositório da API Boamente"
                        autores="Última versão - por Laís Carvalho Coutinho"
                        link="https://github.com/laisdeveloper/API-Boamente"
                        textoBotao="Acessar Repositório GitHub"
                    />
                </nav>
            </section>
        </main>
    );
}

function ResourceCard({ titulo, autores, link, textoBotao }) {
    return (
        <div className={styles.recursos}>
            <h3>{titulo}</h3>
            <span>
                {autores.split('\n').map((linha, index) => (
                    <React.Fragment key={index}>
                        {linha}
                        <br />
                    </React.Fragment>
                ))}
            </span>
            <button
                className={styles.btnRecursos}
                onClick={() => window.open(link, '_blank')}
            >
                {textoBotao}
            </button>
        </div>
    );
}
