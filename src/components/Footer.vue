<template>
    <footer class="footer">
        <div class="footer-left">

        </div>
        <div class="footer-center">
            <div class="credits">Designed and Built by Alexander Greff</div>
            <div class="social-media">
                <a title="Github" href="https://github.com/alex-greff" target="_blank" class="icon">
                    <i class="fab fa-github"></i>
                </a>
                <a title="LinkedIn" href="https://www.linkedin.com/in/alex-greff/" target="_blank" class="icon">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a title="Email" href="mailto:alex.j.greff@gmail.com" target="_top" class="icon">
                    <i class="fas fa-envelope"></i>
                </a>
                <a title="SoundCloud" href="https://soundcloud.com/hammerled" target="_blank" class="icon">
                    <i class="fab fa-soundcloud"></i>
                </a>
            </div>
        </div>
        <div class="footer-right">
            <theme-controls></theme-controls>
            <div class="dashboard"><a href="#">Dashboard</a></div>
        </div>
    </footer>
</template>

<script>
    import ThemeControls from './ThemeControls.vue';
    export default {
        components: {
            themeControls: ThemeControls
        }
    }
</script>


<style lang="scss">
    #app {
        min-height: 100%;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 1fr auto;
    }

    main {
        flex: 1;
    }

    .footer {
        grid-column: 1 / 1;
        grid-row: 2 / 2;

        font-size: 1.2rem;

        text-align: center;

        grid-row-start: 2;
        grid-row-end: 3;

        padding: 1.3rem;
        z-index: 5;

        background: rgba(var(--color-footer-bg), 1);
        color: rgba(var(--color-footer-text), 1);

        display: flex;
        justify-content: space-between;
    }

    .footer-left {
        margin-right: 0.5rem;
    }

    .footer-center {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }

    .footer-right {
        margin-left: 0.5rem;

        text-align: right;

        & div {
            margin-bottom: 0.5rem;
        }
        & div:first-child {
            margin-top: 0.5rem;
        }
        & div:last-child {
            margin-bottom: 0;
        }
    }

    .dashboard {
        & a {
            text-decoration: underline;
            color: inherit;
        }

        & a:hover {
            color: rgba(var(--color-accent-primary), 1);
        }
    }

    .social-media {
        margin-top: 0.5rem;

        & > .icon {
            font-size: 1.7rem;

            margin-right: 0.5rem;
            margin-left: 0.5rem;

            cursor: pointer;

            color: inherit;

            &:hover {
                color: rgba(var(--color-accent-primary), 1);
            }
        }
    }
</style>

