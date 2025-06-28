import { useEffect } from 'react';
import axios from 'axios';

function UserTracker() {
    useEffect(() => {
        const event = {
            user_id: 'user123',
            event_type: 'page_view',
            metadata: { path: window.location.pathname },
        };

        axios.post('http://localhost:8000/api/events/', event)
            .then(res => console.log('Gửi hành vi thành công:', res.data))
            .catch(err => console.error('Lỗi:', err));
    }, []);

    return null;
}

export default UserTracker;
