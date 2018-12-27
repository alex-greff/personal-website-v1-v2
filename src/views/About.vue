<template>
    <div class="about-content">
        <!-- <h1>About Page Component</h1> -->
        <div class="blurb-container">
            <div class="blurb-title">A little about myself</div>
            <div class="blurb-text">
                <p>
                    I am a computer science student specializing on software engineering at the University of Toronto.

                </p>

                <p>
                    Throughout my childhood I have always had a knack for tinkering with things. 
                    At the age of 13 I started coding and have not stopped since.
                </p>
                <p>
                    Over the years I have completed numerous projects using various technologies including Java, C, C# and HTML/CSS/JavaScript to name a few. 
                    Some of these projects I am more proud of than others but from every project I always strive to take away something to improve on in later projects.

                    I am a passionate and self-motivated person who absolutely loves to learn new technologies through school and numerous extracurricular sources. 
                </p>
                <p>
                    Recently I have been improving my web development skills by learning new frameworks such as Vue JS and Angular.

                    I spend countless hours on Udemy and YouTube in my ever-presisting endeavors to learn more and more.
                </p>
            </div>
        </div>
        <div class="profile-image-container">
            <div class="profile-image">
                <div class="profile-image-sub"></div>
            </div>
            
            
            <!-- <img src="../assets/images/profile-picture-2.jpg"> -->
        </div>


        <!-- <feColorMatrix type="matrix" result="grayscale"
            values="1 0 0 0 0
                    1 0 0 0 0
                    1 0 0 0 0
                    0 0 0 1 0" >
        </feColorMatrix>
        <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
        <feFuncR type="table" tableValues="(189/255) 0.9882352941"></feFuncR>
        <feFuncG type="table" tableValues="(11/255) 0.7333333333"></feFuncG>
        <feFuncB type="table" tableValues="(145/255) 0.05098039216"></feFuncB>
        <feFuncA type="table" tableValues="0 1"></feFuncA>
        </feComponentTransfer> -->

        <!-- <filter id="duotone">
            <feColorMatrix type="matrix"
                values=".33 .33 .33 0 0
                        .33 .33 .33 0 0
                        .33 .33 .33 0 0
                        0    0   0  1 0">
            </feColorMatrix>
            <feComponentTransfer>
                <feFuncR type="table" tableValues=".996078431 .984313725"></feFuncR>
                <feFuncG type="table" tableValues=".125490196 .941176471"></feFuncG>
                <feFuncG type="table" tableValues=".552941176 .478431373"></feFuncG>
            </feComponentTransfer>
        </filter> -->
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
            this.setCurrentAutoTheme({ theme: "green" });
        }
    }
</script>

<style lang="scss" scoped>
    $cell-width: 50rem;
    $grid-padding: 2.5rem;

    .about-content {
        position: relative;

        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 0 $grid-padding;

        padding: 0 3rem 0 3rem;

        @include respond(tab-port) {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            grid-gap: 0 0;

            // padding: 0 10rem 0 10rem;
        }

        @include respond(phone) {
            // padding: 0 3rem 0 3rem;
        }

        // Align
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .blurb-container {
        grid-column: 1 / 1;
        grid-row: 1 / 1;

        @include respond(tab-port) {
            grid-column: 1 / 1;
            grid-row: 2 / 2;

            // Horizontal center align
            margin-left: auto; 
            margin-right: auto;

            padding-top: 3rem;
            padding-bottom: 7rem;
        }

        max-width: $cell-width;

        // Vertical align
        position: relative;
        top: 50%;
        transform: translateY(-50%);

        // Horizontal right align
        margin-left: auto; 
        margin-right: 0;

        & .blurb-title {
            font-size: 3rem;
            font-weight: bold;

            color: rgba(var(--color-accent-primary), 1);

            margin-bottom: 1.5rem;
        }

        & .blurb-text {
            font-size: 1.5rem;
            font-weight: 400;

            color: rgba(var(--color-page-text), 1);

            text-indent: 30px;

            & p {
                margin-bottom: 1rem;   
            }
        }
    }

    .profile-image-container {
        grid-column: 2 / 2;
        grid-row: 1 / 1;

        @include respond(tab-port) {
            grid-column: 1 / 1;
            grid-row: 1 / 1;

            margin-left: auto;
            margin-right: auto;
        }
        
        max-width: $cell-width;

        min-width: 20rem;
        min-height: 20rem;

        height: 100%;
        width: 100%;

        // Verticle align
        position: relative;
        top: 50%;
        transform: translateY(-50%);

        left: 0;

        overflow: hidden;

        & .profile-image {
            position: relative;

            width: 100%;
            height: 100%;

            background-color: rgba(var(--color-accent-tertiary), 1);

            clip-path: polygon(0 10%, 100% 5%, 100% 90%, 0 95%);

            transition: clip-path 0.5s, background-color 0.5s;

            z-index: 2;

            &:hover {
                clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%);

                background-color: rgba(var(--color-accent-tertiary), 0);
            }
        }

        & .profile-image-sub {
            position: relative;

            width: 100%;
            height: 100%;

            background-size: cover;
            background-position: center;
            background-image: url('../assets/images/profile-picture-2.jpg');

            // filter: url(#duotone);
            opacity: 0.5;

            transform: scale(1.1);
            filter: grayscale(100%) brightness(40%);

            transition: filter 0.5s, transform 0.5s, opacity 0.5s;

            z-index: 1;

            &:hover {
                transform: scale(1);
                opacity: 1;
                filter: grayscale(0%) brightness(100%);
            }
        }
    }
</style>



