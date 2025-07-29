const images = [
  { src: 'https://picsum.photos/id/1015/400/300', alt: 'Imagem 1' },
  { src: 'https://picsum.photos/id/1020/400/300', alt: 'Imagem 2' },
  { src: 'https://picsum.photos/id/1025/400/300', alt: 'Imagem 3' },
  { src: 'https://picsum.photos/id/1035/400/300', alt: 'Imagem 4' },
  { src: 'https://picsum.photos/id/1045/400/300', alt: 'Imagem 5' },
  { src: 'https://picsum.photos/id/1055/400/300', alt: 'Imagem 6' },
  { src: 'https://picsum.photos/id/1065/400/300', alt: 'Imagem 7' },
  { src: 'https://picsum.photos/id/1075/400/300', alt: 'Imagem 8' },
  { src: 'https://picsum.photos/id/1085/400/300', alt: 'Imagem 9' },
  { src: "https://i.pinimg.com/1200x/ef/9c/8a/ef9c8a1491961bc4b7616f71d673f0e6.jpg", alt: "imagem11" },
  { src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ6aZ6FEeySZQsKfY2k9mmPO4rKflgJd0WK9w7HOgLNtyqp4S0QCjKvYEFm-Fsdtijpy8zaGedhAMZ-jX3NjrUn3yaEAuxPZqDgMn0pXRiF", alt: 'imagem10' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfL-PJzM6l-lkDyUj7L5C3C9nyJ3gEar4oXtnKo3LtZjm9xYsZJTaut2FXQNfBTgKxjRqEPMBW3YTBcJm9V2yrOX7mEZqzHE19FaYgsdJ1KA', alt: "imagem11" }
];

const linksExternos = [
  'https://www.linkedin.com/in/xxvitaoxxvictorsaib/',
  'https://www.instagram.com/dralarissasaib/',
  'https://www.instagram.com/robertaotcham',
  'https://www.instagram.com/fenix_multicoisas',
  "https://hostinger.com.br/?REFERRALCODE=1VICTOR444vps123",
  "https://uteis01.pages.dev/servicobancario"
];

const gallery = document.getElementById('gallery');
const shuffleBtn = document.getElementById('shuffleBtn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeText = document.querySelector('.close-text');

let usedIndexes = [];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderGallery(reset = false) {
  if (reset) {
    gallery.innerHTML = '';
    usedIndexes = [];
  }

  const shuffledImages = shuffleArray(images);
  const shuffledLinks = shuffleArray(linksExternos);

  let added = 0;
  for (let i = 0; i < shuffledImages.length && added < 3; i++) {
    if (!usedIndexes.includes(shuffledImages[i].src)) {
      usedIndexes.push(shuffledImages[i].src);

      const item = document.createElement('div');
      item.className = 'gallery-item';

      const imageEl = document.createElement('img');
      imageEl.src = shuffledImages[i].src;
      imageEl.alt = shuffledImages[i].alt;
      imageEl.setAttribute("data-pin-media", shuffledImages[i].src);
      imageEl.setAttribute("data-pin-description", shuffledImages[i].alt);

      // Evento para abrir modal ao clicar na imagem
      imageEl.addEventListener('click', () => openModal(shuffledImages[i].src, shuffledImages[i].alt));

      const linkBtn = document.createElement('a');
      linkBtn.href = shuffledLinks[added] || '#';
      linkBtn.target = '_blank';
      linkBtn.rel = 'noopener noreferrer';
      linkBtn.className = 'visit-btn';
      linkBtn.textContent = 'CONFIRA ESSA OPORTUNIDADE!';

      item.appendChild(imageEl);
      item.appendChild(linkBtn);
      gallery.appendChild(item);

      added++;
    }
  }
}

function openModal(src, alt) {
  modal.style.display = 'flex';
  modalImage.src = src;
  modalImage.alt = alt;
}

function closeModal(event) {
  // Fecha modal se clicar fora da imagem ou no X
  if (event.target === modal || event.target === closeText) {
    modal.style.display = 'none';
    modalImage.src = '';
    modalImage.alt = '';
  }
}

shuffleBtn.addEventListener('click', () => renderGallery(true));
loadMoreBtn.addEventListener('click', () => renderGallery(false));

// Inicializa a galeria
renderGallery();
