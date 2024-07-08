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

    //FUNÇÃO PARA EXCLUIR PACIENTE
  function excluirPaciente(id) {
    axios.delete("http://localhost:5218/pacientes" + id)
    .then(() => {
      setPacientes();
    });
  }

  function editarPaciente(paciente) {
    setPaciente(paciente);
  }

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

  //FUNÇÃO PARA SALVAR PACIENTE

  function salvarPaciente() {
    if (paciente.id) {
      axios.put("http://localhost:5218/pacientes/" + paciente.id, paciente).then(() => { refresh(); });
    } else {
      axios.post("http://localhost:5218/pacientes", paciente).then(() => {refresh });
    }
  }

  function excluirPaciente(id) {
    axios.delete("http://localhost:5218/pacientes/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function reiniciarEstadoDosObjetos() {
    setPaciente(null);
  }

  function onChangePaciente(campo, valor, id) {
    paciente[campo] = valor;
    setPaciente({
      ...paciente,
        });
  }

  //Função para geração do formulário
  function getFormulario() {
    return (
      <form action="">
        <label>Nome</label>
        <input type="text" id="nome" name="nome" value={paciente.nome}
          onChange={(e) => {onChangePaciente(e.target.name, e.target.value, paciente.id) }}/>
        <button onClick={() => {salvarPaciente(); }}>Salvar</button>
        <button onClick={() => {reiniciarEstadoDosObjetos}}>Cancelar</button>
      </form>
    );
  }

  //Funções para geração da tabela
  function getLinhaDaTabela(paciente) {
    return (
      <tr>
        <td>{paciente.id}</td>
        <td>{paciente.nome}</td>
        <td>
          <button onClick={() => {excluirPaciente(paciente.id) }}>Excluir</button>
          <button onClick={() => {editarPaciente(paciente) }}>Editar</button>
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
