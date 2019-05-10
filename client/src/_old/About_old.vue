<template>
    <div class="about-content">
        <!-- <h1>About Page Component</h1> -->
        <div class="blurb-container">
            <div class="blurb-title">A little about myself</div>
            <div class="blurb-text">
                <p>
                    I am a computer science student specializing in software engineering at the University of Toronto.
                    I am a passionate and self-motivated person who absolutely loves to learn new technologies through school and numerous extracurricular sources. 
                    I greatly enjoy many aspects of the computer science field with web development being one of my favorites.
                </p>
                <p>
                    As of January 2018, I am currently doing my co-op work term at CaseWare as a software developer. 
                    <!-- Some more text here about the company and what skills I am improving on there...
                    Some more text here about the company and what skills I am improving on there...
                    Some more text here about the company and what skills I am improving on there... -->
                </p>
            </div>
        </div>
        <div class="profile-image-container">
            <div class="profile-image-super">
                <div class="profile-image"></div>
            </div>
        </div>
        <div class="timeline-container">
            <timeline></timeline>
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
import Timeline from '@/components/Timeline.vue';

export default {
    components: {
        timeline: Timeline
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running About enter anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 0); // TODO: remove
        });
    },
    leaveAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running About leave anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 100); // TODO: remove
        });
    }
}
</script>

<style lang="scss" scoped>
    $cell-width: 50rem;
    $grid-padding: 2.5rem;
    $encasing-cell-size: 8rem;
    $timeline-height: 10rem;

    .about-content {

        position: relative;

        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr $timeline-height;
        // grid-template-rows: $encasing-cell-size 1fr $encasing-cell-size;
        grid-gap: $grid-padding $grid-padding;

        padding: 0 3rem 0 3rem;

        // ------------------------------------
        // --- Responsive Grid Restructuring --
        // ------------------------------------
        @include respond(tab-port) {
            grid-template-columns: 1fr;
            // grid-template-rows: 30rem auto 1fr;
            grid-template-rows: 30rem 2fr 1fr;
            grid-gap: 0 0;

            // margin-bottom: 30rem;
            // padding-bottom: 20rem;
            // top: 0;
            // left: 50%;
            // transform: translate(-50%, 0);    
            padding-bottom: 7rem;
        }
        @include respond(phone) {
            grid-template-columns: 1fr;
            // grid-template-rows: 20rem auto 1fr;
            grid-template-rows: 20rem 2fr 1fr;
            grid-gap: 0 0;
        }

        // Align
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .blurb-container {
        grid-column: 1 / 2;
        // grid-row: 2 / 2;
        grid-row: 1 / 2;

        @include respond(tab-port) {
            grid-column: 1 / 2;
            grid-row: 2 / 3;

            // Horizontal center align
            margin-left: auto; 
            margin-right: auto;

            padding-top: 3rem;
            padding-bottom: 3rem;
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

            color: theme-link("page", "accent-color", "primary");

            margin-bottom: 1.5rem;
        }

        & .blurb-text {
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
            font-size: 1.5rem;

            line-height: 1.5;
            // text-indent: 30px;

            color: theme-link("page", "text-color", "secondary");

            & p {
                margin-bottom: 1rem;   
            }
        }
    }

    .profile-image-container {
        grid-column: 2 / 3;
        // grid-row: 1 / -1;
        grid-row: 1 / 2;

        @include respond(tab-port) {
            grid-column: 1 / 2;
            grid-row: 1 / 2;

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

        & .profile-image-super {
            position: relative;

            width: 100%;
            height: 100%;

            background-color: theme-link("page", "selected-color", "primary"); // TODO: not the right selector name

            clip-path: polygon(0 10%, 100% 5%, 100% 90%, 0 95%);

            transition: clip-path 0.5s, background-color 0.5s;

            z-index: 2;

            &:hover {
                clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%);

                background-color: theme-link("page", "selected-color", "primary", 0); // TODO: not the right selector name
            }
        }

        & .profile-image {
            position: relative;

            width: 100%;
            height: 100%;

            background-size: cover;
            background-position: center;
            background-image: url('../assets/images/profile-picture-2.jpg');

            border-radius: 2px;

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

    .timeline-container {
        grid-column: 1 / -1;
        grid-row: 2 / 3;

        margin: 0 10rem 0 10rem;

        @include respond(tab-port) {
            grid-column: 1 / 2;
            grid-row: -2 / -1;

            margin: 0 3rem 0 3rem;
        }

        @include respond(big-desktop) {
            margin: 0 15rem 0 15rem;
        }
    }
</style>



