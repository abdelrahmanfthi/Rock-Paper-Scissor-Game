const chances = Array.from(document.querySelectorAll('.chance'));
const YOUPICKED = document.querySelector('.YOU-PICKED');
const THEHOUSEPICKED = document.querySelector('.THE-HOUSE-PICKED');
const bgBefore = document.querySelector('.bg-before');
const result = document.querySelector('.result');
const again = document.querySelector('.again');
const counter = document.querySelector('.counter');
const rules = document.querySelector('.rules');
const rule = document.querySelector('.rule');

function getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * chances.length);
    return chances[randomIndex];
}

let score = 0;

window.onload = () => {
         bgBefore.classList.remove('bg-before');
         again.classList.add('hidden');
         updateScoreDisplay(); 
         rule.classList.add('hidden');
         close.classList.add('hidden');
     };
    
     function updateScoreDisplay() {
         counter.textContent = `Score: ${score}`;
     }   

chances.forEach(image => {
    // حفظ لون الحدود الأصلي لكل صورة
    const originalBorderColor = window.getComputedStyle(image).borderColor;

    image.addEventListener('click', () => {
        // إخفاء الخلفية
        const triangle = document.querySelector('.triangle')
        triangle.classList.add('img-hidden');
        bgBefore.classList.add('bg-before');

        YOUPICKED.innerHTML = 'YOU PICKED';
        THEHOUSEPICKED.innerHTML = 'THE HOUSE PICKED';

        // إخفاء جميع الصور
        chances.forEach(img => img.classList.add('img-hidden'));

        // عرض صورة المستخدم مع المحافظة على لون الحدود
        image.classList.remove('img-hidden');
        image.classList.add('img-centered');
        image.style.position = 'relative';
        image.style.borderColor = originalBorderColor;

        // انتظار 2 ثانية ثم اختيار الكمبيوتر
        setTimeout(() => {  
            const housePick = getRandomChoice();

            // إنشاء نسخة من اختيار الكمبيوتر للعرض
            const clone = housePick.cloneNode(true);
            clone.classList.add('pcChoice');
            clone.style.borderColor = window.getComputedStyle(housePick).borderColor;
            clone.style.position = 'absolute';
            clone.classList.add('pc2');
            THEHOUSEPICKED.appendChild(clone);
            clone.classList.remove('img-hidden');
            clone.classList.add('img-centered');

            // مقارنة اختيار المستخدم باختيار الكمبيوتر
            if (housePick === image) {
                result.innerHTML = 'You draw with PC';
                result.style.position = 'relative';
                result.style.left = '47.7rem';
                again.style.color = originalBorderColor;
            } else if (
                (image.dataset.choice === 'rock' && housePick.dataset.choice === 'scissors') ||
                (image.dataset.choice === 'scissors' && housePick.dataset.choice === 'paper') ||
                (image.dataset.choice === 'paper' && housePick.dataset.choice === 'rock')
            ) {
                result.innerHTML = 'YOU WIN!';
                result.style.position = 'relative';
                result.style.left = '51.5rem';
                again.style.color = originalBorderColor;
                score++; 
            } else {
                result.innerHTML = 'YOU LOSE';
                result.style.position = 'relative';
                result.style.left = '51rem';
                again.style.color = originalBorderColor;
                score = Math.max(0, score - 1);
            }

            updateScoreDisplay();
            again.textContent = 'PLAY AGAIN';
            again.classList.remove('hidden');
            again.classList.add('again');
            again.addEventListener('click', resetGame); 
        }, 2000);
    });
});

// دالة لإعادة تعيين اللعبة
function resetGame() {
    // إعادة تعيين النصوص والفئات
    YOUPICKED.innerHTML = '';
    THEHOUSEPICKED.innerHTML = '';
    result.textContent = '';
    again.classList.add('hidden');

    const triangle = document.querySelector('.triangle');
    triangle.classList.remove('img-hidden');
    bgBefore.classList.remove('bg-before');

    // إعادة إظهار جميع الصور
    chances.forEach((chance) => {
        chance.classList.remove('img-hidden');
        chance.classList.remove('img-centered');
        chance.style.position = '';
        chance.style.borderColor = '';
    });
}

rule.classList.remove('rule');

rules.addEventListener('click',()=>{
    rule.classList.toggle('rule');
});