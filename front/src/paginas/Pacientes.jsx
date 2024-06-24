import "./componentes.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Pacientes() {
  //Entidades e listas utilizadas na página
  const [paciente, setPaciente] = useState(null);
  const [pacientes, setPacientes] = useState([]);

  //Funções de carregamento de dados do backend
  function getPacientes() {
    axios.get("http://localhost:5218/pacientes").then((resposta) => {
      setPacientes(resposta.data);
    });
  }

  useEffect(() => {
    getPacientes();
  }, []);

  //Funções para manipulação da entidade principal
  function novoPaciente() {
    setPaciente({
      id: 0,
      nome: "",
    });
  }

  function alterarPaciente(campo, valor, id) {
    paciente[campo] = valor;
    setPaciente({
      id: id,
      nome: paciente.nome,
    });
  }

  function excluirPaciente(id) {
    axios.delete("http://localhost:5218/pacientes/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function reiniciarEstadoDosObjetos() {
    setPaciente(null);
    getPacientes();
  }

  //Função para geração do formulário
  function getFormulario() {
    return (
      <form>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={paciente.nome}
          onChange={(e) => {
            alterarPaciente(e.target.name, e.target.value, paciente.id);
          }}
        />
        <button type="button">Salvar</button>
        <button
          type="button"
          onClick={() => {
            setPaciente(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  //Funções para geração da tabela
  function getLinhaDaTabela(paciente) {
    return (
      <tr key={paciente.id}>
        <td>{paciente.id}</td>
        <td>{paciente.nome}</td>
        <td>
          <button type="button">Excluir</button>
          <button type="button">Editar</button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    const linhasDaTabela = [];
    for (let i = 0; i < pacientes.length; i++) {
      const paciente = pacientes[i];
      linhasDaTabela[i] = getLinhaDaTabela(paciente);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  //Função do conteúdo principal
  function getConteudo() {
    if (paciente == null) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novoPaciente();
            }}
          >
            Novo paciente
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  return (
    <div className="cadastros">
      <div className="conteudo">{getConteudo()}</div>
    </div>
  );
}

export default Pacientes;
