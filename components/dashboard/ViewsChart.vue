<template>
    <canvas id="chart" />
</template>

<script setup lang="js">
    import { onMounted } from 'vue';
    import { LineController, CategoryScale, Chart, LinearScale, LineElement,Tooltip, PointElement } from 'chart.js';
    Chart.register([
        CategoryScale,
        LineController,
        LineElement,
        LinearScale,
        PointElement,
        Tooltip,
    ]);
    const data = [
        { year: "judul", count: 10 },
        { year: "judul1", count: 20 },
        { year: "judul2", count: 15 },
        { year: "judul3", count: 25 },
        { year: "judul4", count: 22 },
    ];
    onMounted(() => {
        const canvas = document.getElementById('chart');
        new Chart(
            canvas,
            {
                type: 'line',
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: true,
                            yAlign: 'bottom'
                        }
                    }
                },
                data: {
                    labels: data.map(row => row.year),
                    datasets: [{
                        label: 'Weight',
                        data: data.map(row=>row.count),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                        ],
                        borderWidth: 1,
                    }]
                }
            }
        );
    });
</script>