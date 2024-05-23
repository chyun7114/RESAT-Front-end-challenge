document.addEventListener('DOMContentLoaded', () => {
    const calendarMonth = document.querySelector('.calendar-month');
    const calendarDate = document.querySelector('.calendar-date');
    const memoContainer = document.querySelector('.memo-container');
    const memoText = document.getElementById('memoText');
    const saveMemo = document.getElementById('saveMemo');
    const closeMemo = document.getElementById('closeMemo');
    const memoList = document.getElementById('memo-list');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentDate = new Date();
    let selectedDate = null;
    let memos = {};

    function renderCalendar() {
        calendarDate.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        calendarMonth.textContent = `${year}년 ${month + 1}월`;

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // 날짜가 없는 날은 빈칸
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('date');
            calendarDate.appendChild(emptyCell);
        }
        
        // 날짜가 있는 날은 숫자 채워넣음
        for (let date = 1; date <= lastDate; date++) {
            const dateCell = document.createElement('div');
            const dayColor = new Date(year, month, date).getDay();

            // 토요일 일요일 색깔 처리
            if(dayColor === 0){
                dateCell.classList.add('date','sunday');
            }else if(dayColor === 6){
                dateCell.classList.add('date', 'saturday');
            }else{
                dateCell.classList.add('date');
            }

            dateCell.textContent = date;

            const memoKey = `${year}-${month + 1}-${date}`;

            if (memos[memoKey] && memos[memoKey].length > 0) {
                const memoIndicator = document.createElement('div');
                memoIndicator.classList.add('memo-indicator');
                dateCell.appendChild(memoIndicator);
            }

            dateCell.addEventListener('click', () => {
                selectedDate = memoKey;
                memoText.value = '';
                renderMemoList();
                memoContainer.style.display = 'block';
                const memoDate = document.querySelector('.memo-date');
                memoDate.textContent = `${year}년 ${month + 1}월${date}일`
                setDateCellStyle(dateCell);
            });

            calendarDate.appendChild(dateCell);
        }
    }

    function renderMemoList(){
        memoList.innerHTML = '';
        if (memos[selectedDate]) {
            memos[selectedDate].forEach((memo, index) => {
                const memoItem = document.createElement('li');
                const memoDeleteButton = document.createElement('button');

                memoDeleteButton.classList.add('delete-button');
                memoDeleteButton.textContent = '삭제';
                
                memoDeleteButton.addEventListener('click', () => {
                    memos[selectedDate].splice(index, 1);
                    renderMemoList();
                    renderCalendar();
                })

                memoItem.textContent = memo;

                memoItem.appendChild(memoDeleteButton);
                memoList.appendChild(memoItem);
            });
        }
    }

    function setDateCellStyle(dateCell) {
        resetDateCellStyle();
        if (dateCell) {
            dateCell.style.backgroundColor = 'skyblue';
            dateCell.style.color = 'white';
        }
    }
    
    function resetDateCellStyle() {
        const dateCells = document.querySelectorAll('.date');
        dateCells.forEach(cell => {
            cell.style.backgroundColor = '';
            cell.style.color = '';
        });
    }

    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    saveMemo.addEventListener('click', () => {
        if (selectedDate) {
            if (!memos[selectedDate]) {
                memos[selectedDate] = [];
            }
            const newMemos = memoText.value.split('\n').filter(memo => memo.trim() !== '');
            memos[selectedDate].push(...newMemos)
            memoText.value = '';
            renderMemoList();
            renderCalendar();
        }
    });

    closeMemo.addEventListener('click', () => {
        memoContainer.style.display = 'none';
        renderCalendar();
    });

    renderCalendar();
});
