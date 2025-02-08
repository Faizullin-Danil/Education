import { useState } from "react"
import { useEffect } from "react"

const AsyncAwait = () => {
    // const delay = (ms) => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => resolve("промис успешно выполнен"), ms)
    //     })
    // }

    // const run = async () => {
    //     console.log("Начало")
    //     await delay(2000)
    //     console.log("прошло 2 секунды")
    // }

    // run()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

        };

        fetchUser();
    }, []);

    console.log(user)


    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;

    return (
        <div>
            <h1>Информация о пользователе</h1>
            <p><strong>Имя:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Город:</strong> {user.address.city}</p>
        </div>
    );
};
export default AsyncAwait