import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientService } from "../../services/patientService";
import "../../style.css";
import style from "./ListPatient.module.css";
import { Archive, X, CheckCircle, AlertCircle } from "lucide-react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-dashboards.svg";


export default function ListPatient({ onInspect, onArchive }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const [patientToArchive, setPatientToArchive] = useState(null);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [archiveError, setArchiveError] = useState('');
  const [archiveSuccess, setArchiveSuccess] = useState('');
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

  const handleInspect = (patientId) => {
    navigate(`/paineldopaciente/${patientId}`);
  };

  const confirmArchive = async () => {
    setArchiveLoading(true);
    setArchiveError('');
    setArchiveSuccess('');
    try {
      await PatientService.arquivarPaciente(patientToArchive.id);
      setPatients((prev) =>
        prev.map((p) =>
          p.id === patientToArchive.id ? { ...p, status: "INATIVO" } : p
        )
      );
      setArchiveSuccess('Paciente arquivado com sucesso!');
    } catch (err) {
      setArchiveError('Falha ao arquivar paciente.');
    } finally {
      setArchiveLoading(false);
    }
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
                <th>Criado em</th>
                <th>Idade</th>
                <th>Sexo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(({ id, fullName, createdAt, age, gender, status }, i) => (
                <tr
                  key={id}
                  className={`${status === "INATIVO" ? style.inactive : ""} ${
                    i % 2 === 0 ? style.stripedRow : ""
                  }`}
                >
                  <td>{formatId(id)}</td>
                  <td>{fullName}</td>
                  <td>
                    {createdAt
                      ? new Date(createdAt).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Não informado"}
                  </td>
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
                      onClick={() => handleInspect(id)}
                      aria-label={`Inspecionar paciente ${fullName}`}
                      title="Inspecionar"
                    >
                      <SearchIcon className={style.searchIcon} />
                    </button>
                    <button
                      className={style.archiveBtn}
                      onClick={() => {
                        console.log("Abrindo modal para arquivar paciente", id, fullName);
                        setPatientToArchive({ id, fullName, status  });
                        setArchiveError('');
                        setArchiveSuccess('');
                        setShowArchiveConfirm(true);
                      }}
                      aria-label={`Arquivar paciente ${fullName}`}
                      title="Arquivar"
                    >
                      <Archive className={style.archiveIcon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showArchiveConfirm && (
        <div className={style.confirmModal} onClick={() => setShowArchiveConfirm(false)}>
          <div className={style.modalContent} onClick={e => e.stopPropagation()}>
            
            <button 
              className={style.closeIconBtn} 
              aria-label="Fechar modal"
              onClick={() => setShowArchiveConfirm(false)}
            >
              <X size={20} />
            </button>

            {patientToArchive.status === "INATIVO" ? (
              <>
                <Archive size={100} style={{ padding: '20px' }}/>
                <p className={style.headerModal}>
                  O paciente <strong>{patientToArchive.fullName}</strong> já está inativo.
                </p>
              </>
            ) : (
              <>
                <p className={style.headerModal}>
                  Tem certeza que deseja arquivar o paciente <strong>{patientToArchive.fullName}</strong>?
                </p>

                <p className={style.archiveWarning}>
                  Aviso: O paciente não poderá mais enviar classificações, seus dados antigos permanecerão armazenados. 
                  Para reativá-lo, é necessário abrir um ticket na aba Suporte.
                </p>

                <div className={style.modalButtons}>
                  <button
                    onClick={confirmArchive}
                    disabled={archiveLoading}
                  >
                    {archiveLoading ? 'Arquivando...' : 'Sim, arquivar'}
                  </button>
                  <button onClick={() => setShowArchiveConfirm(false)}>Cancelar</button>
                </div>

                {archiveError && (
                  <p className={style.errorMessage}>
                    <AlertCircle size={20} style={{ marginRight: '8px', verticalAlign: 'middle', color: '#d9534f' }} />
                    {archiveError}
                  </p>
                )}
                {archiveSuccess && (
                  <p className={style.successMessage}>
                    <CheckCircle size={20} style={{ marginRight: '8px', verticalAlign: 'middle', color: '#5cb85c' }} />
                    {archiveSuccess}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}