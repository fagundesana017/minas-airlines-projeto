document.addEventListener('DOMContentLoaded', () => {
    fetchHangars();  // Chama a função ao carregar a página
  });
let allHangars = [];
const tiposHangar = {
    'P': 'Pequeno',
    'M': 'Médio',
    'G': 'Grande'
};

// Função para buscar hangares
async function fetchHangars() {
    const user = localStorage.getItem("user");
    const password = localStorage.getItem("password");

    if (user && password) {
        const basicAuth = btoa(`${user}:${password}`);

        try {
            document.getElementById("overlay").style.display = "flex";

            const response = await fetch("https://a3-airport-midm.onrender.com/hangars/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${basicAuth}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status} - ${response.statusText}`);
            }

            const hangars = await response.json();

            document.getElementById("overlay").style.display = "none";
            const tableBody = document.querySelector(".responsive-table");
            tableBody.innerHTML = `
                <li class="table-header">
                    <div class="col col-1">Cód.</div>
                    <div class="col col-2">Nome</div>
                    <div class="col col-3">Capacidade máxima</div>
                    <div class="col col-3">Tipo</div>
                    <div class="col col-4">Localização</div>
                    <div class="col col-5">Aeronaves</div>
                    <div class="col col-7">Ação</div>
                </li>`;

            hangars.forEach(hangar => {
                const row = document.createElement("li");
                row.className = "table-row";

                row.innerHTML = `
                    <div class="col col-1" data-label="Cód.">${hangar.codigo}</div>
                    <div class="col col-2" data-label="Nome">${hangar.nome}</div>
                    <div class="col col-3" data-label="Capacidade máxima">${hangar.capacidade_maxima}</div>
                    <div class="col col-4" data-label="Tipo">${tiposHangar[hangar.tipo] || hangar.tipo}</div>
                    <div class="col col-4" data-label="Localização">${hangar.localizacao}</div>
                    <div class="col col-5" data-label="Aeronaves"> ${hangar.aeronaves.map(aeronave => `
                ${aeronave.matricula},`).join('')}</div>
                    <div class="col col-7" data-label="Ação">
                    <button class="action-btn edit-btn" title="Editar" 
                        onclick="redirecionarParaEdicao('${hangar.id}')">
                        <i class="bi bi-pencil-square"></i>
                    </button>

                     <button class="action-btn delete-btn" title="Delete" onclick="deleteHangar('${hangar.id}')">
                            <i class="bi bi-trash3"></i>
                     </button>


                    </div>`;
                tableBody.appendChild(row);
            });

        } catch (error) {
            console.error(error);
            alert(`Erro ao carregar os dados dos hangares: ${error.message}`);
            document.getElementById("overlay").style.display = "none";
        }
    }
}

//Função para cadastrar um hangar

// Função para atulizar o hangar



// Função para deletar o hangar
async function deleteHangar(hangarId) {
    const user = localStorage.getItem("user");
    const password = localStorage.getItem("password");

    if (user && password) {
        const basicAuth = btoa(`${user}:${password}`);

        try {
            const response = await fetch(`https://a3-airport-midm.onrender.com/hangars/${hangarId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${basicAuth}`,
                },
            });

            if (response.ok) {
                // Exibir mensagem de sucesso
                showMessage("Hangar deletado com sucesso.", "success");

                // Recarregar a página
                setTimeout(() => {
                    location.reload();
                }, 3000); // Aguarda 1 segundo para o usuário visualizar a mensagem
            } else {
                const error = await response.json();
                showMessage("Erro ao deletar hangar: " + error.detail, "error");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            showMessage("Ocorreu um erro ao tentar deletar o hangar.", "error");
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

// Ligar o evento ao botão de confirmação na modal
document.getElementById('confirmDeleteButton').addEventListener('click', deleteHangar);

  
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
                        <button class="action-btn edit-btn" title="Editar" 
                            onclick="redirecionarParaEdicao('${hangar.id}')">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="action-btn delete-btn" title="Delete" data-bs-toggle="modal" data-bs-target="#cancelModal" onclick="openDeleteModal('${hangar.id}')">
                            <i class="bi bi-trash3"></i>
                        </button>

                    </div>`;
      tableBody.appendChild(row);
    });
  }
  


// Ao carregar a página de edição
window.onload = function() {
    const hangarId = new URLSearchParams(window.location.search).get("id");
    if (hangarId) {
        buscarHangarPorId(hangarId);
    }
};


function redirecionarParaEdicao(hangarId) {
    window.location.href = `../register/hangarEdit.html?id=${hangarId}`;
    console.log("Redirecionando para:", url);}



// Função para pesquisar na tabela
function searchTable() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('table tbody tr');

    rows.forEach(row => {
        const matricula = row.querySelector('th').textContent.toLowerCase();
        if (matricula.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

document.getElementById('button-addon2').addEventListener('click', searchTable);

document.getElementById('searchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchTable();
    }
});


// Função para adicionar aeronaves ao hangar
async function adicionarAeronaves() {
    const hangarId = document.getElementById("codigo").value;
    const selectedAeronaves = Array.from(document.getElementById("aeronaves").selectedOptions).map(option => option.value);

    try {
        const response = await fetch(`https://a3-airport-midm.onrender.com/hangars/${hangarId}/add_aeronaves/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(localStorage.getItem("user") + ":" + localStorage.getItem("password"))
            },
            body: JSON.stringify({ aeronaves: selectedAeronaves })
        });

        if (response.ok) {
            alert("Aeronaves adicionadas com sucesso!");
        } else {
            const error = await response.json();
            alert("Erro ao adicionar aeronaves: " + error.detail);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro ao tentar adicionar as aeronaves.");
    }
}


// Chamar a função para buscar o hangar por ID quando a página for carregada
window.onload = function() {
    const hangarId = new URLSearchParams(window.location.search).get("id");
    if (hangarId) {
        buscarHangarPorId(hangarId);
    }
};

// Função de logout
function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("password");
    window.location.href = 'login.html';
}
