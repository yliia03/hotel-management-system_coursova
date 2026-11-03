const API_URL = 'http://localhost:3000';

class RoomRepository {
    static async getAll() {
        const response = await fetch(`${API_URL}/rooms`);
        if (!response.ok) {
            throw new Error('Помилка завантаження даних');
        }
        return await response.json();
    }
}

class BookingRepository {
    static async getAll() {
        const response = await fetch(`${API_URL}/bookings`);
        if (!response.ok) {
            throw new Error('Помилка завантаження бронювань');
        }
        return await response.json();
    }
}

class NotificationService {
    constructor() {
        if (NotificationService.instance) {
            return NotificationService.instance;
        }
        this.msgBox = document.getElementById('status-message');
        NotificationService.instance = this;
    }

    showError(text) {
        if (!this.msgBox) return;
        this.msgBox.className = 'message-box error';
        this.msgBox.textContent = text;
        this.msgBox.classList.remove('hidden');
    }

    showSuccess(text) {
        if (!this.msgBox) return;
        this.msgBox.className = 'message-box success';
        this.msgBox.textContent = text;
        this.msgBox.classList.remove('hidden');
    }
}

const notifier = new NotificationService();

async function loadRooms() {
    const container = document.getElementById('rooms-container');
    if (!container) return;

    try {
        const rooms = await RoomRepository.getAll();
        displayRooms(rooms);
    } catch (error) {
        console.error('Помилка:', error);
        notifier.showError('Не вдалося завантажити дані з сервера. Перевірте, чи запущено json-server.');
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