import userInforApi from "../api/userApi/userInfor";
import React, { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userInforApi.getUserInfor();
                console.log("Dữ liệu user trả về từ API:", data);
                setUser(data.user);
            } catch (error) {
                console.error("Không thể lấy thông tin người dùng:", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) return <div>Đang tải...</div>;

    return (
    <div>
        <h2>Thông tin cá nhân</h2>

        {user?.avatar ? (
            <img
                src={`http://localhost:8000${user.avatar}`}
                alt="Avatar"
                style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }}
            />
        ) : (
            <p>Chưa có ảnh đại diện</p>
        )}

        <p>Họ tên: {user?.full_name || "..."}</p>
        <p>Số điện thoại: {user?.phone || "..."}</p>
        <p>Giới tính: {user?.gender || "..."}</p>
        <p>Ngày sinh: {user?.birth_date || "..."}</p>
        <p>Địa chỉ: {user?.address || "..."}</p>
        
    </div>
);
};

export default Profile;
