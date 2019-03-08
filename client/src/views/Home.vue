<template>
    <div class="home-content">
        <div class="welcome-container">
            <div class="greeting-text">Hi, my name is</div>
            <h1 class="name-text">Alexander Greff</h1>
            <div class="info-text">
                I am a computer science student specializing in software engineering at the 
                <span class="uni-name">University of Toronto</span>.
            </div>

            <router-link to="/contact" tag="div" class="btn contact-btn">
                <a>Contact Me</a>
            </router-link>
        </div>
        <div class="logo-container">
            <div class="logo-1">
                <svg viewBox="0 0 16.5 16.5" clipPath="#logo-clip">
                    <use xlink:href="#logo-symbol" href="#logo-symbol"/>
                </svg>
            </div>
            <div class="logo-2">
                <svg viewBox="0 0 16.5 16.5">
                    <use xlink:href="#logo-symbol" href="#logo-symbol"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions({
                setCurrentAutoTheme: "setCurrentAutoTheme"
            })
        },
        created() {
            this.setCurrentAutoTheme({ theme: "blue" });
        }
    }
</script>

<style lang="scss" scoped>
    * {
        font-size: 2rem;
    }

    .home-content {
        padding: 0 15rem 0 15rem;

        @include respond(tab-port) {
            padding: 0 5rem 0 5rem;
        }
        @include respond(tab-land) {
            padding: 0 7rem 0 7rem;
        }
        @include respond(phone) {
            padding: 0 2rem 0 2rem;
        }

        display: grid;

        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 0 2.5rem;

        @include respond(tab-port) {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-gap: 2.5rem 0;
        }

        // Vertical align
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .welcome-container {
        grid-column: 1 / 1;
        grid-row: 1 / 1;

        z-index: 5;

        // Vertical align
        position: relative;
        top: 50%;
        transform: translateY(-50%);

        // Horizontal right align
        margin-left: auto; 
        margin-right: 0;

        @include respond(tab-port) {
            // Horizontal center
            margin-left: auto; 
            margin-right: auto;
        }

        & .greeting-text {
            font-size: 2.5rem;
            font-weight: 400;
        }

        & .name-text {
            font-size: 6rem;
            font-weight: bold;

            color: rgba(var(--color-accent-primary), 1);

            // text-shadow:
            //     -1px -1px 0 rgba(var(--color-accent-secondary), 1),
            //     1px -1px 0 rgba(var(--color-accent-secondary), 1),
            //     -1px 1px 0 rgba(var(--color-accent-secondary), 1),
            //     1px 1px 0 rgba(var(--color-accent-secondary), 1);
        }

        & .info-text {
            font-size: 1.5rem;

            font-family: 'Montserrat', sans-serif;
            font-weight: 400;

            max-width: 50rem;

            & .uni-name {
                font-size: inherit;

                color: rgba(var(--color-accent-primary), 1);
            }
        }

        & .contact-btn {
            font-size: 2rem;

            margin-top: 2.5rem;

            display: inline-block;
        }
    }

    .logo-container {
        grid-column: 2 / 2;
        grid-row: 1 / 1;

        @include respond(tab-port) {
            grid-column: 1 / 1;
        }

        position: relative;

        & .logo-1, & .logo-2 {
            & svg {
                height: 40rem;

                @include respond(tab-port) {
                    height: 30rem;
                }

                @include respond(big-desktop) {
                    height: 50rem;

                }
            }

            @include respond(tab-port) {
                // Center
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            // Vertical center
            top: 50%;
            transform: translateY(-50%);
            // Left align
            left: 0;
        }

        & .logo-1 {
            position: absolute;

            & svg {
                fill: rgba(var(--color-accent-primary), 1);

                @include respond(tab-port) {
                    fill: rgb(77, 77, 77); // TODO: put this in the theme?
                }
            }
            
            z-index: 2;
        }

        & .logo-2 {
            position: absolute;

            & svg {
                fill: rgba(var(--color-accent-tertiary), 0.7);

                @include respond(tab-port) {
                    fill: rgb(48, 48, 48); // TODO: put this in the theme?
                }

                // Offset
                transform: translate(0.7rem, 0.7rem);
            }

            z-index: 1;
        }
    }   
</style>

