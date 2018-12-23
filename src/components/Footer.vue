<template>
    <footer class="footer">
        <div class="credits">Designed and Built by Alexander Greff</div>
        <div class="social-media">
            <i class="fab fa-github icon"></i>
            <i class="fab fa-linkedin icon"></i>
            <i class="fas fa-envelope icon"></i>
            <i class="fab fa-soundcloud icon"></i>
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

            &:hover {
                color: $nav-color-tertiary;
            }
        }
    }
</style>

