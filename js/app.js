class NotificationService {
  static instance = null;

  constructor() {
    if (NotificationService.instance) {
      return NotificationService.instance;
    }
    NotificationService.instance = this;
  }

  static getInstance() {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  showSuccess(message) {
    const el = document.getElementById('notification');
    if (el) {
      el.textContent = message;
      el.className = 'notification success';
      setTimeout(() => el.textContent = '', 4000);
    }
  }

  showError(message) {
    const el = document.getElementById('notification');
    if (el) {
      el.textContent = message;
      el.className = 'notification error';
    }
  }
}

class RoomRepository {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async getOffers() {
    const res = await fetch(`${this.baseUrl}/rooms`);
    if (!res.ok) throw new Error('Помилка отримання пропозицій');
    return await res.json();
  }

  async createOffer(roomData) {
    const res = await fetch(`${this.baseUrl}/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roomData)
    });
    if (!res.ok) throw new Error('Помилка створення пропозиції');
    return await res.json();
  }

  async updateOffer(id, updateData) {
    const res = await fetch(`${this.baseUrl}/rooms/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!res.ok) throw new Error('Помилка оновлення пропозиції');
    return await res.json();
  }

  async deleteOffer(id) {
    const res = await fetch(`${this.baseUrl}/rooms/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Помилка видалення пропозиції');
    return true;
  }
}

class BookingRepository {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async getRequests() {
    const res = await fetch(`${this.baseUrl}/requests`);
    if (!res.ok) throw new Error('Помилка завантаження заявок');
    return await res.json();
  }

  async createRequest(bookingData) {
    const res = await fetch(`${this.baseUrl}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) throw new Error('Помилка створення заявки');
    return await res.json();
  }

  async updateRequestStatus(id, newStatus) {
    const validStatuses = ['В обробці', 'Підтверджено', 'Скасовано'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Неприпустимий статус: ${newStatus}`);
    }

    const res = await fetch(`${this.baseUrl}/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error('Помилка оновлення статусу');
    return await res.json();
  }
}