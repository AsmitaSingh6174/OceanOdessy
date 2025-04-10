//This Was USed For Demo.... 
//It only contains navbar js...

// nav sidebar
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';

    //animation
    sidebar.style.animation = 'slideIn 0.3s forwards';
    document.body.style.overflow = 'hidden';
    
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.filter = 'blur(3px)';
        mainContent.style.transition = 'filter 0.3s ease';
    }
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');

    if (!sidebar) return;

    // sidebar_animation
    sidebar.style.animation = 'slideOut 0.3s forwards';

    setTimeout(() => {
        sidebar.style.display = 'none';
        document.body.style.overflow = 'auto';

        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.style.filter = 'blur(0)';
        }
    }, 300);
}
