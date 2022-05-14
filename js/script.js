const init = () => {
    const video_element = document.querySelector('#video');
    const video_controls = document.querySelector('#video-controls');
    const time_remaining_element = document.querySelector('#time-remaining');

    video_element.addEventListener('loadeddata', () => {
        console.log('Video data loaded');

        time_remaining_element.innerHTML = toHHMMSS(getTimeRemaining(video_element));

        changeColorTimeRemaining(video_element);

        video_controls.addEventListener('click', (evt) => {
            const target = evt.target;

            let action = target.dataset.action;

            if (action) {
                action = action.toLowerCase();

                switch (action) {
                    case 'play':
                        target.dataset.action = 'pause';
                        target.title = 'Pause video';
                        target.children[0].classList = target.children[0].className.replace(
                            'play',
                            'pause'
                        );
                        video_element.play();

                        break;

                    case 'pause':
                        target.dataset.action = 'play';
                        target.title = 'Play video';
                        target.children[0].classList = target.children[0].className.replace(
                            'pause',
                            'play'
                        );
                        video_element.pause();

                        break;
                    
                    case '+10':
                        video_element.currentTime += 10;

                        break;

                    case '-10':
                        video_element.currentTime -= 10;
                        
                        break;
                }
            }
        });
    });

    video_element.addEventListener('timeupdate', () => {
        time_remaining_element.innerHTML = toHHMMSS(getTimeRemaining(video_element));

        changeColorTimeRemaining(video_element);

        if (video_element.currentTime === video_element.duration) { 
            video_element.currentTime = 0;
            video_element.play();
        }
    });

    function getTimeRemaining(video_element) {
        const total_time = video_element.duration;
        const current_time = video_element.currentTime;
        const time_remaining = total_time - current_time;

        return time_remaining;
    }

    function toHHMMSS(value) {
        let sec_num = parseInt(value, 10);
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - hours * 3600) / 60);

        let seconds = sec_num - hours * 3600 - minutes * 60;

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;
    }

    function changeColorTimeRemaining(video_element) {
        let time_remaining = getTimeRemaining(video_element);

        let percentatge_time_remaining = (time_remaining / video_element.duration) * 100;

        if (percentatge_time_remaining > 80) {
            time_remaining_element.style.color = 'green';
        } else if (percentatge_time_remaining <= 80 && percentatge_time_remaining >= 10) {
            time_remaining_element.style.color = 'orange';
        } else {
            time_remaining_element.style.color = 'red';
        }
    }
};

document.addEventListener('DOMContentLoaded', init);
