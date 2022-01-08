import React from "react";
import './style.css';

export default () => {
    let profiles = [
        {name: 'Lucifer', icon: 'url(https://pbs.twimg.com/profile_images/1047642299696652288/mj6-mW0w_400x400.jpg)'}, 
        {name: 'Geralt', icon: 'url(https://observatoriodocinema.uol.com.br/wp-content/uploads/2021/09/the-witcher.jpg)'},
        {name: 'Johnny', icon: 'url(https://m.media-amazon.com/images/M/MV5BMzlkODQ0ODMtYmQ5NS00MWZhLTlkMjAtYTMwYzg5MjNkNmFmXkEyXkFqcGdeQXVyMjUwNzgxNjk@._V1_.jpg)'},
        {name: 'Pablo', icon: 'url(https://jpimg.com.br/uploads/2017/09/narcos.jpg)'},
        {name: 'Hopper', icon: 'url(https://conteudo.imguol.com.br/c/entretenimento/86/2019/07/05/jim-hopper-david-harbour-na-terceira-temporada-de-stranger-things-1562343903266_v2_450x337.jpg)'},
        {name: 'Gambita', icon: 'url(https://veja.abril.com.br/wp-content/uploads/2020/10/The-Queens-Gambit-_077R.jpg.jpg)'},
        {name: 'Mathew', icon: 'url(https://emc.acidadeon.com/dbimagens/charlie_cox_1200x675_07122021092324.jpg)'},
        {name: 'Thomas', icon: 'url(https://tm.ibxk.com.br/2021/06/10/10152930440231.jpg)'},
    ];
    let chosen = Math.floor(Math.random() * (profiles.length-1));
    let user = profiles[chosen];

    return (
        <div className="header--user" >
            <p className="header--username">{user.name}</p>
            <div className="header--userimg" style={{
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundImage: user.icon}}>
            </div>
        </div>
    );
}