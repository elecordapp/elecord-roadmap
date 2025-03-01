// Copyright (c) 2025 hazzuk
// SPDX-License-Identifier: AGPL-3.0-only

async function loadBoardData() {
    try {
        const response = await fetch('board-data.json');
        return await response.json();
    } catch (error) {
        console.error('Error loading board data:', error);
        return null;
    }
}

function createBoard(boardData) {
    const board = document.getElementById('board');
    boardData.columns.forEach(column => {
        const columnElement = document.createElement('div');
        columnElement.className = 'column';
        columnElement.innerHTML = `<h2>${column.title}</h2>`;
        
        column.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `
                ${card.image ? `<img src="${card.image}" alt="${card.title}">` : ''}
                ${card.tag ? `<div class="tag ${card.tag}" alt="${card.tag}">${card.tag}</div>` : ''}
                <div class="title">${card.title}</div>
            `;
            cardElement.addEventListener('click', () => showModal(card));
            columnElement.appendChild(cardElement);
        });
        
        board.appendChild(columnElement);
    });
}

function showModal(card) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalTitle.textContent = card.title;
    modalDescription.textContent = card.description;
    modal.style.display = 'block';
}

// close modal when clicking on the close button or outside the modal
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal || event.target.classList.contains('close')) {
        modal.style.display = 'none';
    }
});

// initialize the board
async function init() {
    const boardData = await loadBoardData();
    if (boardData) {
        createBoard(boardData);
    } else {
        console.error('Failed to load board data');
    }
}

init();
