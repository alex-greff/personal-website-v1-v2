<template>
    <footer class="footer">
        <div class="credits">Designed and Built by Alexander Greff</div>
        <div class="social-media">
            <a title="Github" href="https://github.com/alex-greff" target="_blank" class="icon">
                <i class="fab fa-github"></i>
            </a>
            <a title="LinkedIn" href="https://www.linkedin.com/in/alex-greff/" target="_blank" class="icon">
                <i class="fab fa-linkedin"></i>
            </a>
            <a title="Email" href="mailto:alex.j.greff@gmail.com" target="_blank" class="icon">
                <i class="fas fa-envelope"></i>
            </a>
            <a title="SoundCloud" href="https://soundcloud.com/hammerled" target="_blank" class="icon">
                <i class="fab fa-soundcloud"></i>
            </a>
        </div>
    </footer>
</template>

<style lang="scss">
    #app {
        min-height: 100%;
        display: grid;
        grid-template-rows: 1fr auto;
    }

    .footer {
        font-size: 1.2rem;

        text-align: center;

        grid-row-start: 2;
        grid-row-end: 3;

        padding: 1.3rem;
        z-index: 5;

        background: rgb(41, 41, 41);
        color: rgb(151, 151, 151);
        // box-shadow: 0 -2px 2px rgba(44, 44, 44, 0.445);
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
                color: $nav-color-tertiary;
            }
        }
    }
</style>

