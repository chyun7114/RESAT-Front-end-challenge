document.addEventListener('DOMContentLoaded', () => {
    const calendarMonth = document.querySelector('.calendar-month');
    const calendarDate = document.querySelector('.calendar-date');
    const memoContainer = document.querySelector('.memo-container');
    const memoText = document.getElementById('memoText');
    const saveMemo = document.getElementById('saveMemo');
    const closeMemo = document.getElementById('closeMemo');
    const memoList = document.createElement('ul');
    memoList.classList.add('memo-list');
    memoContainer.insertBefore(memoList, memoText);
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

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('date');
            calendarDate.appendChild(emptyCell);
        }

        for (let date = 1; date <= lastDate; date++) {
            const dateCell = document.createElement('div');
            dateCell.classList.add('date');
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
    });

    renderCalendar();
});
