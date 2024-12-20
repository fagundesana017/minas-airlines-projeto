document.addEventListener('DOMContentLoaded', () => {
    fetchAirplanes();  // Chama a função ao carregar a página
  });
let allAirplanes = [];
function openEditModal(airplaneId) {
    // Redireciona para a página de edição, passando o ID da aeronave como parâmetro de consulta
    window.location.href = `airplanesPage.html?id=${airplaneId}`;
}

// Função para buscar aeronaves
async function fetchAirplanes() {
    const user = localStorage.getItem("user");
    const password = localStorage.getItem("password");

    if (user && password) {
        const basicAuth = btoa(`${user}:${password}`);

        try {
            document.getElementById("overlay").style.display = "flex";

            const response = await fetch("https://a3-airport-midm.onrender.com/airplanes/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${basicAuth}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status} - ${response.statusText}`);
            }

            const aeronaves = await response.json();

            document.getElementById("overlay").style.display = "none";
            const tableBody = document.querySelector(".responsive-table");
            tableBody.innerHTML = `
                <li class="table-header">
                    <div class="col col-1">Matrícula</div>
                    <div class="col col-2">Número do voo</div>
                    <div class="col col-3">Modelo</div>
                    <div class="col col-4">Procedência</div>
                    <div class="col col-5">Destino</div>
                    <div class="col col-6">Qtd. de passageiros</div>
                    <div class="col col-7">Ação</div>
                </li>`;

            aeronaves.forEach(airplane => {
                const row = document.createElement("li");
                row.className = "table-row";
                const airplaneCount = Array.isArray(airplane.airplanes) ? airplane.airplanes.length : 0;

                row.innerHTML = `
                    <div class="col col-1" data-label="Matrícula">${airplane.matricula}</div>
                    <div class="col col-2" data-label="Número do voo">${airplane.numero_Voo}</div>
                    <div class="col col-3" data-label="Modelo">${airplane.modelo}</div>
                    <div class="col col-4" data-label="Procedência">${airplane.procedencia}</div>
                    <div class="col col-4" data-label="Destino">${airplane.destino}</div>
                    <div class="col col-5" data-label="Qtd. de passageiros"> ${airplane.numero_passageiros ? airplane.numero_passageiros : '-'}</div>
                    <div class="col col-7" data-label="Ação">
                         <button class="action-btn edit-btn" title="Editar" 
                            onclick="redirecionarParaEdicao('${airplane.id}')">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                    <button class="action-btn delete-btn" title="Delete" onclick="deleteAeronave('${airplane.id}')">
                            <i class="bi bi-trash3"></i>
                     </button>

                    </div>`;
                tableBody.appendChild(row);
            });

        } catch (error) {
            console.error(error);
            alert(`Erro ao carregar os dados dos aeronaves: ${error.message}`);
            document.getElementById("overlay").style.display = "none";
        }
    }
}


// Função para cadastrar a aeronave
async function cadastroAeronave() {
        console.log('Cadatrado')
        // Pegando os valores dos campos do formulário
        const matricula = document.getElementById("matricula").value;
        const numeroVoo = document.getElementById("numeroVoo").value;
        const modelo = document.getElementById("modelo").value;
        const procedencia = document.getElementById("procedencia").value;
        const destino = document.getElementById("destino").value;
        const numeroPassageiros = document.getElementById("numeroPassageiros").value;
        const hangarId = document.getElementById("hangar").value;

        // Validando os campos
        if (!matricula || !numeroVoo || !modelo || !procedencia || !destino || !numeroPassageiros || !hangarId) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Exibindo o overlay de carregamento
        document.getElementById("overlay").style.display = "flex";

        // Definindo o objeto com os dados da aeronave
        const airplaneData = {
            matricula,
            numero_Voo: numeroVoo,
            modelo,
            procedencia,
            destino,
            numero_passageiros: numeroPassageiros,
            hangar: hangarId
        };

        try {
            const user = localStorage.getItem("user");
            const password = localStorage.getItem("password");

            if (user && password) {
                const basicAuth = btoa(`${user}:${password}`);

                // Enviando os dados para a API para cadastrar a aeronave
                const response = await fetch("https://a3-airport-midm.onrender.com/airplanes/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${basicAuth}`,
                    },
                    body: JSON.stringify(airplaneData),
                });

                if (response.ok) {
                    // Exibir mensagem de sucesso
                    showMessage("Aeronave deletada com sucesso.", "success");
    
                    // Recarregar a página
                    setTimeout(() => {
                        location.reload();
                    }, 1000); // Aguarda 1 segundo para o usuário visualizar a mensagem
                } else {
                    const error = await response.json();
                    showMessage("Erro ao deletar aeronave: " + error.detail, "error");
                }
               

            }
        } catch (error) {
            console.error(error);
            alert(`Erro ao cadastrar a aeronave: ${error.message}`);
            document.getElementById("overlay").style.display = "none";
        }
}


// Função para deletar a aeronave
async function deleteAeronave(aeronaveId) {
    const user = localStorage.getItem("user");
    const password = localStorage.getItem("password");

    if (user && password) {
        const basicAuth = btoa(`${user}:${password}`);

        try {
            const response = await fetch(`https://a3-airport-midm.onrender.com/airplanes/${aeronaveId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${basicAuth}`,
                },
            });

            if (response.ok) {
                // Exibir mensagem de sucesso
                showMessage("Aeronave deletada com sucesso.", "success");

                // Recarregar a página
                setTimeout(() => {
                    location.reload();
                }, 1000); // Aguarda 1 segundo para o usuário visualizar a mensagem
            } else {
                const error = await response.json();
                showMessage("Erro ao deletar aeronave: " + error.detail, "error");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            showMessage("Ocorreu um erro ao tentar deletar a aeronave.", "error");
        }
    }
}

// Função de exibição de mensagens de sucesso ou erro
function showMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    
    if (type === "success") {
        messageDiv.style.backgroundColor = "green";
        messageDiv.style.color = "white";
    } else if (type === "error") {
        messageDiv.style.backgroundColor = "red";
        messageDiv.style.color = "white";
    }
    
    messageDiv.style.position = "fixed";
    messageDiv.style.top = "20px";
    messageDiv.style.left = "50%";
    messageDiv.style.transform = "translateX(-50%)";
    messageDiv.style.padding = "10px 20px";
    messageDiv.style.borderRadius = "5px";
    messageDiv.style.zIndex = "1000";

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}


//Função para obter por id
    function setFormMode(isEdit, data) {
        if (isEdit) {
            // Preenche os campos com os dados existentes
            document.getElementById("matricula").value = data.matricula;
            document.getElementById("numeroVoo").value = data.numeroVoo;
            document.getElementById("modelo").value = data.modelo;
            document.getElementById("procedencia").value = data.procedencia;
            document.getElementById("destino").value = data.destino;
            document.getElementById("numeroPassageiros").value = data.numeroPassageiros;
            document.getElementById("hangar").value = data.hangarId; // Supondo que 'hangarId' seja o ID do hangar
        } else {
            // Limpar os campos caso esteja no modo de cadastro
            document.getElementById("matricula").value = '';
            document.getElementById("numeroVoo").value = '';
            document.getElementById("modelo").value = '';
            document.getElementById("procedencia").value = '';
            document.getElementById("destino").value = '';
            document.getElementById("numeroPassageiros").value = '';
            document.getElementById("hangar").value = ''; // Limpar o valor do hangar
        }
    }

    // Exemplo de como verificar se está editando ou criando
    function initForm() {
        const urlParams = new URLSearchParams(window.location.search);
        const isEdit = urlParams.has("id"); // Verifica se tem um ID, sugerindo que é um modo de edição

        if (isEdit) {
            // Aqui você pode buscar os dados da aeronave com o ID passado na URL
            const airplaneId = urlParams.get("id");
            
            // Exemplo de busca dos dados (isso pode vir de uma API, por exemplo)
            fetch(`https://a3-airport-midm.onrender.com/airplanes/${airplaneId}`)
                .then(response => response.json())
                .then(data => {
                    setFormMode(true, data); // Preenche os campos com os dados da aeronave
                })
                .catch(error => {
                    console.error("Erro ao buscar dados da aeronave:", error);
                    alert("Erro ao carregar os dados da aeronave.");
                });
        } else {
            setFormMode(false); // Modo de cadastro, campos vazios
        }
    }

    // Chama a função ao carregar a página
    window.onload = initForm;

// Função para editar a aeronave
function redirecionarParaEdicao(hangarId) {
    window.location.href = `../register/airplaneEdit.html?id=${hangarId}`;
}


window.onload = fetchAircraftData;

// Função para deletar o aeronave
function deleteHangar() {
    const hangarId = window.selectedHangarId; // Obtendo o ID do hangar a partir da variável global
  
    if (!hangarId) {
      console.error('Nenhum aeronave selecionado para deleção.');
      return;
    }
  
    const hangar = allAirplanes.find(h => h.id === hangarId);
  
    if (!hangar) {
      console.error('Aeronave não encontrado!');
      return;
    }
  
    // Remova o hangar da lista (se não tiver aeronaves vinculadas)
    if (hangar.airplanesCount > 0) {
      alert('Este hangar possui aeronaves vinculadas e não pode ser deletado.');
      return;
    }
  
    const hangarIndex = allAirplanes.findIndex(h => h.id === hangarId);
    allAirplanes.splice(hangarIndex, 1);  // Excluindo o hangar da lista
  
    // Fechar o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('cancelModal'));
    modal.hide();
  
    // Atualizar a tabela com a lista de hangares
    displayHangars(allAirplanes);
  }
  

  function openDeleteModal(hangarId) {
    // Encontrar o hangar pelo ID
    const hangar = allAirplanes.find(h => h.id === hangarId);
  
    if (!hangar) {
      console.error('Aeronave não encontrado.');
      return;
    }
  
    // Armazenar o ID do hangar selecionado para a exclusão
    window.selectedHangarId = hangar.id;
  
    // Encontrar o código do hangar (assumindo que o código é a propriedade 'code')
    const hangarCode = hangar.code;
  
    // Atualizar a mensagem no corpo do modal para exibir o código do hangar
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `
      <i class="bi bi-exclamation-circle" style="color: rgb(235, 13, 13); margin-right: 10px;"></i>
      Tem certeza de que deseja deletar o hangar ${hangarCode}?
    `;
  }
  
  
  function displayHangars(hangars) {
    const table = document.querySelector('.responsive-table');
    table.innerHTML = ''; // Limpar a tabela antes de adicionar os hangares
  
    hangars.forEach(hangar => {
      const row = document.createElement('li');
      row.classList.add('table-row');
      row.innerHTML = `
                    <div class="col col-1" data-label="Cód.">${hangar.codigo}</div>
                    <div class="col col-2" data-label="Nome">${hangar.nome}</div>
                    <div class="col col-3" data-label="Capacidade máxima">${hangar.capacidade_maxima}</div>
                    <div class="col col-4" data-label="Localização">${hangar.tipo}</div>
                    <div class="col col-4" data-label="Localização">${hangar.localizacao}</div>
                    <div class="col col-5" data-label="Aeronaves">${airplaneCount}</div>
                    <div class="col col-7" data-label="Ação">
                        <button class="action-btn edit-btn" title="Editar">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="action-btn delete-btn" title="Delete" data-bs-toggle="modal" data-bs-target="#cancelModal" onclick="openDeleteModal('${hangar.id}')">
                            <i class="bi bi-trash3"></i>
                        </button>

                    </div>`;
      tableBody.appendChild(row);
    });
  }
  
  
// Função para pesquisar na tabela
// Função de pesquisa
function searchTable() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();

    // Filtra os dados com base no valor da matrícula
    const filteredAirplanes = airplanes.filter(airplane =>
        airplane.matricula.toLowerCase().includes(searchValue)
    );

    // Atualiza a tabela com os dados filtrados
    displayAirplanes(filteredAirplanes);
}

// Evento para chamar a função de pesquisa quando o botão for clicado
document.getElementById('button-addon2').addEventListener('click', searchTable);

// Evento para chamar a função de pesquisa quando pressionar Enter
document.getElementById('searchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchTable();
    }
});


