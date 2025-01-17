// Theme handling
function initializeTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', theme);
    document.getElementById('themeToggle').innerHTML = theme === 'dark' ? '☀️' : '🌓';
}

// Enhanced Chart configurations with animations and tooltips
let carbonChart, waterChart, wasteChart;
const chartData = {
    labels: ['Initial'],
    datasets: [{
        label: 'Carbon Footprint (kg)',
        data: [0],
        borderColor: '#2ECC71',
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#27AE60',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        fill: true
    }]
};

// Chart animation configuration
const chartAnimation = {
    duration: 800,
    easing: 'easeInOutQuart',
    from: {
        opacity: 0,
        scale: 0.8
    },
    to: {
        opacity: 1,
        scale: 1
    }
};

// Enhanced chart initialization with animations and interactions
function initializeCharts() {
    const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            animation: chartAnimation,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Roboto',
                            size: 12
                        },
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.95)',
                    titleFont: {
                        family: 'Roboto',
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Roboto',
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: 'Roboto',
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Roboto',
                            size: 11
                        }
                    }
                }
            }
        }
    };

    // Initialize carbon chart with enhanced styling
    carbonChart = new Chart(
        document.getElementById('carbonChart').getContext('2d'),
        {
            ...chartConfig,
            data: {
                ...chartData,
                datasets: [{
                    ...chartData.datasets[0],
                    label: 'Carbon Footprint (kg)',
                    borderColor: '#2ECC71',
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    pointBackgroundColor: '#27AE60'
                }]
            }
        }
    );

    // Initialize water chart with enhanced styling
    waterChart = new Chart(
        document.getElementById('waterChart').getContext('2d'),
        {
            ...chartConfig,
            data: {
                ...chartData,
                datasets: [{
                    ...chartData.datasets[0],
                    label: 'Water Usage (L)',
                    borderColor: '#3498DB',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    pointBackgroundColor: '#2980B9'
                }]
            }
        }
    );

    // Initialize waste chart with enhanced styling
    wasteChart = new Chart(
        document.getElementById('wasteChart').getContext('2d'),
        {
            ...chartConfig,
            data: {
                ...chartData,
                datasets: [{
                    ...chartData.datasets[0],
                    label: 'Waste Reduction (kg)',
                    borderColor: '#F1C40F',
                    backgroundColor: 'rgba(241, 196, 15, 0.2)',
                    pointBackgroundColor: '#F39C12'
                }]
            }
        }
    );

    // Add hover effects to charts
    [carbonChart, waterChart, wasteChart].forEach(chart => {
        chart.canvas.addEventListener('mousemove', (e) => {
            const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
            if (points.length) {
                chart.canvas.style.cursor = 'pointer';
            } else {
                chart.canvas.style.cursor = 'default';
            }
        });
    });
}

// Enhanced Carbon footprint calculator with animations
const calculatorForm = document.getElementById('calculatorForm');
const inputs = calculatorForm.querySelectorAll('input');

// Add input animations
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    // Add real-time validation
    input.addEventListener('input', () => {
        const value = parseFloat(input.value);
        const errorElement = document.getElementById(`${input.id}-error`);
        
        if (isNaN(value) || value < 0) {
            errorElement.textContent = 'Please enter a valid positive number';
            input.classList.add('error');
        } else {
            errorElement.textContent = '';
            input.classList.remove('error');
        }
    });
});

calculatorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all inputs
    let isValid = true;
    inputs.forEach(input => {
        const value = parseFloat(input.value);
        if (isNaN(value) || value < 0) {
            isValid = false;
            input.classList.add('error');
        }
    });

    if (!isValid) {
        showAlert('Please correct the errors in the form', 'error');
        return;
    }

    // Get input values with animation
    const commute = parseFloat(document.getElementById('commute').value);
    const electricity = parseFloat(document.getElementById('electricity').value);
    const gas = parseFloat(document.getElementById('gas').value);

    // Calculate with visual feedback
    const calculations = [
        { label: 'Transport', value: commute * 0.2 },
        { label: 'Electricity', value: electricity * 0.5 },
        { label: 'Gas', value: gas * 2.0 }
    ];

    const totalCO2 = calculations.reduce((sum, calc) => sum + calc.value, 0);

    // Animate the result update
    const resultElement = document.getElementById('calculated-footprint');
    const currentValue = parseFloat(resultElement.textContent);
    animateValue(resultElement, currentValue, totalCO2, 1000);

    // Update other displays with animations
    animateValue(document.getElementById('carbon-footprint'), 
                parseFloat(document.getElementById('carbon-footprint').textContent),
                totalCO2, 1000);

    // Animate progress bar
    const maxCO2 = 1000;
    const progress = (totalCO2 / maxCO2) * 100;
    const progressBar = document.getElementById('carbon-progress');
    progressBar.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
    progressBar.style.width = `${Math.min(progress, 100)}%`;

    // Update charts with animation
    updateCharts(totalCO2);

    // Show success message
    showAlert('Carbon footprint calculated successfully!', 'success');

    // Add subtle form submission feedback
    calculatorForm.classList.add('submitted');
    setTimeout(() => calculatorForm.classList.remove('submitted'), 500);
});

// Value animation function
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (range * easeOutQuart);
        
        element.textContent = current.toFixed(2);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Enhanced chart update function with tooltips
function updateCharts(carbonValue) {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString();

    // Update carbon chart with tooltips
    carbonChart.data.labels.push(timeLabel);
    carbonChart.data.datasets[0].data.push(carbonValue);
    carbonChart.options.plugins.tooltip = {
        callbacks: {
            label: function(context) {
                return `Carbon Footprint: ${context.parsed.y.toFixed(2)} kg CO₂`;
            }
        }
    };
    carbonChart.update();

    // Example water and waste calculations based on carbon footprint
    const waterValue = carbonValue * 2; // Example correlation
    const wasteValue = carbonValue * 0.5; // Example correlation

    // Update water chart with tooltips
    waterChart.data.labels.push(timeLabel);
    waterChart.data.datasets[0].data.push(waterValue);
    waterChart.options.plugins.tooltip = {
        callbacks: {
            label: function(context) {
                return `Water Usage: ${context.parsed.y.toFixed(2)} L`;
            }
        }
    };
    waterChart.update();

    // Update waste chart with tooltips
    wasteChart.data.labels.push(timeLabel);
    wasteChart.data.datasets[0].data.push(wasteValue);
    wasteChart.options.plugins.tooltip = {
        callbacks: {
            label: function(context) {
                return `Waste Reduced: ${context.parsed.y.toFixed(2)} kg`;
            }
        }
    };
    wasteChart.update();

    // Update display values and check achievements
    document.getElementById('water-usage').textContent = waterValue.toFixed(2);
    document.getElementById('waste-reduction').textContent = wasteValue.toFixed(2);
    checkAchievements();
}

// Enhanced alert function
function showAlert(message, type = 'info') {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.style.display = 'block';
    alert.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
    alert.style.color = type === 'success' ? '#155724' : '#721c24';
    
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

// Chart type selector
document.getElementById('chartType').addEventListener('change', function(e) {
    const chartType = e.target.value;
    [carbonChart, waterChart, wasteChart].forEach(chart => {
        chart.config.type = chartType;
        chart.update();
    });
});

// Modal functionality
const modal = document.getElementById('infoModal');
const btn = document.getElementById('learnMoreBtn');
const closeBtn = document.getElementById('closeModal');

btn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Initialize charts and other features when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeCharts();
    initializeTips();
    checkAchievements();
});

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.getElementById('themeToggle').innerHTML = newTheme === 'dark' ? '☀️' : '🌓';
});

// Export data functionality
document.getElementById('exportData').addEventListener('click', exportData);

function exportData() {
    const data = {
        carbonFootprint: document.getElementById('carbon-footprint').textContent,
        waterUsage: document.getElementById('water-usage').textContent,
        wasteReduction: document.getElementById('waste-reduction').textContent,
        chartData: {
            carbon: carbonChart.data,
            water: waterChart.data,
            waste: wasteChart.data
        }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sustainability-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Sustainability tips
const tips = [
    "Turn off lights when leaving a room to save electricity.",
    "Use public transportation or bike to reduce carbon emissions.",
    "Reduce water waste by fixing leaky faucets.",
    "Use reusable bags instead of plastic bags.",
    "Consider installing solar panels for renewable energy.",
    "Start composting to reduce waste and create natural fertilizer.",
    "Use energy-efficient LED bulbs.",
    "Collect rainwater for garden irrigation."
];

function initializeTips() {
    const tipsContainer = document.getElementById('tipsContainer');
    tips.forEach(tip => {
        const tipCard = document.createElement('div');
        tipCard.className = 'tip-card';
        tipCard.textContent = tip;
        tipsContainer.appendChild(tipCard);
    });
}

// Achievement system
const achievements = {
    firstEntry: { earned: false, threshold: 1, message: "Made your first entry!" },
    carbonReducer: { earned: false, threshold: 50, message: "Reduced carbon footprint by 50kg!" },
    waterSaver: { earned: false, threshold: 100, message: "Saved 100L of water!" },
    wasteManager: { earned: false, threshold: 25, message: "Reduced waste by 25kg!" }
};

function checkAchievements() {
    const carbonValue = parseFloat(document.getElementById('carbon-footprint').textContent);
    const waterValue = parseFloat(document.getElementById('water-usage').textContent);
    const wasteValue = parseFloat(document.getElementById('waste-reduction').textContent);

    if (!achievements.firstEntry.earned && (carbonValue > 0 || waterValue > 0 || wasteValue > 0)) {
        earnAchievement('firstEntry');
    }
    if (!achievements.carbonReducer.earned && carbonValue >= achievements.carbonReducer.threshold) {
        earnAchievement('carbonReducer');
    }
    if (!achievements.waterSaver.earned && waterValue >= achievements.waterSaver.threshold) {
        earnAchievement('waterSaver');
    }
    if (!achievements.wasteManager.earned && wasteValue >= achievements.wasteManager.threshold) {
        earnAchievement('wasteManager');
    }
}

function earnAchievement(achievementId) {
    achievements[achievementId].earned = true;
    const badge = document.getElementById(achievementId);
    badge.style.background = 'var(--badge-bg)';
    showAlert(`Achievement Unlocked: ${achievements[achievementId].message}`, 'success');
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

