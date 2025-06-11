import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../style.css";
import style from "./ListPatient.module.css";


const mockPatients = [
  { id: "P001", name: "Ana Silva", status: "ativo" },
  { id: "P002", name: "Carlos Souza", status: "inativo" },
  { id: "P003", name: "Mariana Lima", status: "ativo" },
  { id: "P004", name: "João Pereira", status: "ativo" },
];

export default function ListPatient({ patients = mockPatients, onInspect, onArchive }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();  

  const handleAddPatient = () => {
    navigate("/cadastrarpaciente"); 
  };

  const handleInspect = (patientId) => {
    navigate(`/paineldopaciente/${patientId}`);
  };

  const filteredPatients = useMemo(() => {
    if (!search.trim()) return patients;
    const s = search.toLowerCase();
    return patients.filter(
      ({ name, id }) => name.toLowerCase().includes(s) || id.toLowerCase().includes(s)
    );
  }, [search, patients]);

  return (
    <section className={style.listPatient}>
      <header className={style.header}>
        <input
          type="search"
          placeholder="Pesquisar por nome ou ID"
          aria-label="Pesquisar pacientes"
          className={style.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className={style.addBtn}
          onClick={handleAddPatient}
          aria-label="Cadastrar paciente"
        >
          + Cadastrar paciente
        </button>
      </header>

      {filteredPatients.length === 0 ? (
        <p className={style.noResults}>Nenhum paciente encontrado.</p>
      ) : (
        <div className={style.tableWrapper}>
          <table className={style.patientTable} aria-label="Lista de pacientes">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(({ id, name, status }, i) => (
                <tr
                  key={id}
                  className={`${status === "inativo" ? style.inactive : ""} ${
                    i % 2 === 0 ? style.stripedRow : ""
                  }`}
                >
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>
                    <span
                      className={
                        status === "ativo" ? style.statusActive : style.statusInactive
                      }
                      aria-label={`Paciente ${status}`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button
                      className={style.actionBtn}
                      onClick={() => handleInspect(id)}
                      aria-label={`Inspecionar paciente ${name}`}
                      title="Inspecionar"
                    >
                      🔍
                    </button>
                    <button
                      className={style.archiveBtn}
                      onClick={() => onArchive?.(id)}
                      aria-label={`Arquivar paciente ${name}`}
                      title="Arquivar"
                    >
                      🗄️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}