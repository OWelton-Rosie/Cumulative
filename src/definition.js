const termLink = document.querySelector('.term');
const definitionBox = document.getElementById('definition-box');

termLink.addEventListener('mouseover', function(event) {
    const definition = event.target.getAttribute('data-definition');
    definitionBox.textContent = definition;
    definitionBox.style.left = `${event.pageX + 10}px`;
    definitionBox.style.top = `${event.pageY + 10}px`;
    definitionBox.classList.remove('hidden');
});

termLink.addEventListener('mouseout', function() {
    definitionBox.classList.add('hidden');
});
