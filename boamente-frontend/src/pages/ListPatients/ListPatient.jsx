import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientService } from "../../services/patientService";
import "../../style.css";
import style from "./ListPatient.module.css";

export default function ListPatient({ onInspect, onArchive }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await PatientService.listarPacientes();
        setPatients(data);
      } catch (err) {
        console.error("Erro ao carregar pacientes:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAddPatient = () => navigate("/cadastrarpaciente");

  const formatId = (id) => {
    return "P" + id.toString().padStart(3, "0");
  };

  const filteredPatients = useMemo(() => {
    if (!search.trim()) return patients;
    const s = search.toLowerCase();
    return patients.filter(({ fullName = "", id }) => 
      fullName.toLowerCase().includes(s) || 
      formatId(id).toLowerCase().includes(s)
    );
  }, [search, patients]);

  if (loading) return <div className={style.loading}>Carregando...</div>;
  if (error) return <div className={style.error}>{error}</div>;

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
                <th>Idade</th>
                <th>Sexo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(({ id, fullName, age, gender, status }, i) => (
                <tr
                  key={id}
                  className={`${status === "inativo" ? style.inactive : ""} ${
                    i % 2 === 0 ? style.stripedRow : ""
                  }`}
                >
                  <td>{formatId(id)}</td>
                  <td>{fullName}</td>
                  <td>{age}</td>
                  <td>
                    {gender === "F" ? "Feminino" :
                    gender === "M" ? "Masculino" :
                    gender === "ND" ? "Não Declarado" :
                    gender}
                  </td>
                  <td>
                    <span
                      className={
                        status === "ATIVO" ? style.statusActive : style.statusInactive
                      }
                      aria-label={`Status: ${status}`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td>
                    <button
                      className={style.actionBtn}
                      onClick={() => onInspect?.(id)}
                      aria-label={`Inspecionar paciente ${fullName}`}
                      title="Inspecionar"
                    >
                      🔍
                    </button>
                    <button
                      className={style.archiveBtn}
                      onClick={() => onArchive?.(id)}
                      aria-label={`Arquivar paciente ${fullName}`}
                      title="Arquivar"
                      disabled={status === "INATIVO"}
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