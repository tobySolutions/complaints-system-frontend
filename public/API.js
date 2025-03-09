// Frontend API calls
const API = {
    submitComplaint: async (data) => {
        const response = await fetch('/api/complaints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
        return response.json();
    },
    
    getComplaints: async (userId) => {
        const response = await fetch(`/api/complaints?user_id=${userId}`);
        return response.json();
    }
};
