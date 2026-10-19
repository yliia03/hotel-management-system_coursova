const API_URL = 'http://localhost:3000/rooms';

async function loadRooms() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Помилка завантаження даних');
        }
        const rooms = await response.json();
        displayRooms(rooms);
    } catch (error) {
        console.error('Помилка:', error);
        document.getElementById('rooms-container').innerHTML = '<p style="color: red;">Не вдалося завантажити дані з сервера. Перевірте, чи запущено json-server.</p>';
    }
}

function displayRooms(rooms) {
    const container = document.getElementById('rooms-container');
    
    if (rooms.length === 0) {
        container.innerHTML = '<p>Номерів не знайдено.</p>';
        return;
    }

    let html = '<table class="room-table"><tr><th>Номер кімнати</th><th>Категорія</th><th>Місткість</th><th>Ціна за добу</th><th>Статус</th></tr>';
    
    rooms.forEach(room => {
        html += `
            <tr>
                <td>${room.roomNumber}</td>
                <td>${room.category}</td>
                <td>${room.capacity} місх(а)</td>
                <td>${room.price} грн</td>
                <td>${room.status}</td>
            </tr>
        `;
    });
    
    html += '</table>';
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', loadRooms);