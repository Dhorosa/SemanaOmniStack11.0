import React, { useEffect, useState } from 'react';
import './style.css';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../Services/api';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const [ownIncidentIds, setOwnIncidentIds] = useState([]);
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    async function loadIncidents() {
      try {
        const ownIncidentsResponse = await api.get('profile', {
          headers: {
            Authorization: ongId,
          },
        });

        setOwnIncidentIds(ownIncidentsResponse.data.map(incident => incident.id));

        const firstPageResponse = await api.get('incidents', {
          params: { page: 1 },
        });

        const total = Number(firstPageResponse.headers['x-total-count'] || 0);
        let publicIncidents = [...firstPageResponse.data];
        let page = 2;

        while (publicIncidents.length < total) {
          const response = await api.get('incidents', {
            params: { page },
          });

          publicIncidents = [...publicIncidents, ...response.data];
          page += 1;
        }

        setIncidents(publicIncidents);
      } catch (error) {
        alert('Erro ao carregar os casos.');
      }
    }

    loadIncidents();
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(currentIncidents => currentIncidents.filter(incident => incident.id !== id));
      setOwnIncidentIds(currentIds => currentIds.filter(incidentId => incidentId !== id));
    } catch (error) {
      alert('Voce so pode excluir os casos criados por voce.');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be the Hero" />
        <span>Bem-vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <p className="profile-description">
        Todos os usuarios logados podem visualizar os casos. Apenas os casos criados por voce podem ser excluidos.
      </p>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRICAO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            {ownIncidentIds.includes(incident.id) && (
              <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            )}
          </li>
        ))}
      </ul>

      {incidents.length === 0 && (
        <p className="empty-message">Nenhum caso cadastrado ate o momento.</p>
      )}
    </div>
  );
}
