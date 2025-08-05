import React from 'react';
import styles from './Contact.module.css';

import ArielImg from '../../assets/images/homepage/ArielSoares.png';
import AdoniasImg from '../../assets/images/homepage/AdoniasCaetano.png';
import EvandroImg from '../../assets/images/homepage/EvandroJose.png';
import LaisImg from '../../assets/images/homepage/LaisCoutinho.png';
import RosanaImg from '../../assets/images/homepage/RosanaCeline.png';
import JoaoImg from '../../assets/images/homepage/JoaoPedro.png';

export default function Contact() {
  return (
    <main>
      <section className={styles.pesquisadores}>
          <h1>Pesquisadores Responsáveis</h1>
          <p className={styles.descricao}>
            Conheça os pesquisadores responsáveis pelo desenvolvimento do sistema, suas áreas de atuação e vínculos institucionais.
          </p>
          <div className={styles.listagem}>
            <Pessoa
              foto={ArielImg}
              nome="Dr. Ariel Soares Teles"
              descricao="Doutor em Engenharia de Eletricidade pela Universidade Federal do Maranhão (UFMA). Pós-doutorado em Biotecnologia na Universidade Federal do Piauí (UFPI/Campus Parnaíba). Professor permanente do Programa de Pós-graduação em Biotecnologia da UFDPar (PPGBiotec/UFDPar), pesquisador associado do Neuro-innovation Technology & Brain Mapping Laboratory (NITLAB/UFDPar). Membro da International Society for Research on Internet Interventions (ISRII)."
              link="http://lattes.cnpq.br/5012476998883237"
            />
            <Pessoa
              foto={AdoniasImg}
              nome="Me. Adonias Caetano de Oliveira"
              descricao="Doutorando em Biotecnologia pela Universidade Federal do Delta do Parnaíba (UFDPar). Possui experiência na área de Inteligência Computacional Aplicada, Processamento de Linguagem Natural, Aprendizagem Profunda e Desenvolvimento de Software. Pesquisador estudante na área de Inteligência Artificial Explicável aplicada no reconhecimento de padrões de ideação suicida em textos não clínicos."
              link="http://lattes.cnpq.br/7142662483525025"
            />
            <Pessoa
              foto={EvandroImg}
              nome="Me. Evandro Jose dos Santos Diniz"
              descricao="Mestre em Biotecnologia pelo PPGBiotec/UFDPar. Especialista em Docência para a Educação Profissional - SENAC-PI/SP e em Gestão Educacional em Rede pelo CEAD/UFPI. Graduado em Administração pela Universidade Federal do Piauí - UFPI e Ciência da Computação pela Universidade Estadual do Piauí - UESPI."
              link="http://lattes.cnpq.br/7610056959202453"
            />
          </div>
      </section>

      <section className={styles.alunos}>
        <h1>Alunos Pesquisadores</h1>
        <p className={styles.descricao}>
          Estes são os alunos que contribuíram com o projeto por meio de pesquisas e desenvolvimento de soluções inovadoras.
        </p>
        <div className={styles.listagem}>
          <Pessoa
            foto={LaisImg}
            nome="Laís Carvalho Coutinho"
            descricao="Aluna de Ciência da Computação no Instituto Federal do Ceará (IFCE/Campus Tianguá). Bolsista do Programa Institucional de Bolsas de Iniciação Científica (PIBIC) sobre Large Language Models na Identificação de Ideação Suicida em Textos Não Clínicos."
            link="http://lattes.cnpq.br/2495618717972916"
          />
          <Pessoa
            foto={RosanaImg}
            nome="Rosana Celine Pinheiro Damaceno"
            descricao="Aluna de Ciência da Computação no Instituto Federal do Ceará (IFCE/Campus Tianguá). Bolsista do Programa Institucional de Bolsas de Iniciação em Desenvolvimento Tecnológico e Inovação (PIBITI) sobre o Desenvolvimento de uma Solução Inteligente Baseada em Fenotipagem Digital para Saúde Mental."
            link="http://lattes.cnpq.br/5041343256204283"
          />
          <Pessoa
            foto={JoaoImg}
            nome="João Pedro Cavalcanti Azevedo"
            descricao="Graduado em Gestão da Tecnologia da Informação (UNICSUL). Pós-graduado em Análise de Dados e Matemática Aplicada (UNYLEYA) e em Gestão Empresarial (MBA - UNICSUL), graduando e mestrando em Ciência da Computação pela Universidade Federal do Maranhão (UFMA). Pesquisador estudante sobre Métodos Semi-Supervisionados aplicados na detecção de ideação em textos não clínicos."
            link="http://lattes.cnpq.br/2135217547166826"
          />
        </div>
      </section>
    </main>
  );
}

function Pessoa({ foto, nome, descricao, link }) {
  return (
    <div className={styles.card}>
      <div className={styles.foto}>
        <img src={foto} alt={`Foto de ${nome}`} />
      </div>
      <h3>{nome}</h3>
      <span>{descricao}</span>
      <button
        className={styles.btnRecursos}
        onClick={() => window.open(link, '_blank')}
>
        Acessar Currículo Lattes
      </button>
    </div>
  );
}
