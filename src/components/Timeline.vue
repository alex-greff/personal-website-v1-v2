<template>
    <div class="timeline">
        <!-- <ul class="timeline-years">
            <li>2015</li>
            <li>2016</li>
            <li>2017</li>
            <li>2018</li>
            <li>2019</li>
        </ul> -->
        <!-- <div v-for="n in getNumYears()" :key="n" class:="'timeline-year' 'year-'n"></div> -->

        <div class="timeline-year-text year-1">2015</div>
        <div class="timeline-year-text year-2">2016</div>
        <div class="timeline-year-text year-3">2017</div>
        <div class="timeline-year-text year-4">2018</div>
        <div class="timeline-year-text year-5">2019</div>

        <div class="line-horizontal left"></div>
        <div class="line-horizontal center"></div>
        <div class="line-horizontal right"></div>

        <div class="line-vertical line-1"></div>
        <div class="line-vertical line-2"></div>
        <div class="line-vertical line-3"></div>
        <div class="line-vertical line-4"></div>
        <div class="line-vertical line-5"></div>

        <div class="timeline-event-plane">
            <div class="temp timeline-event order-1 start-2015-Jan end-2019-Feb"><span>Some event</span></div>
            <div class="temp2 timeline-event order-2 start-2014-Jul end-2015-Mar"><span>Some event</span></div>
            <div class="temp3 timeline-event order-3 start-past end-future"><span>Some event</span></div>

            <!-- <div class="temp3 timeline-event order-3 start-2014-Jul end-2019-Jun">Some event</div> -->
        </div>
    </div>
</template>

<script>
    export default {
        // data: {
        //     numYears: 5
        // },
        // computed: {
        //     getNumYears() {
        //         let bodyStyles = document.body.style;
        //         bodyStyles.setProperty("--num-years", currTheme[THEME_ITEM]);
        //         // return getComputedStyle(document.documentElement).getPropertyValue("--num-years");
        //         return "";
        //     }
        // }, 
        // mounted() {
        //     console.log(this.getNumYears());
        // }
    }
</script>

<style lang="scss" scoped>
    // :root {
    //     --line-color: 31, 31, 31; // rgb(31, 31, 31)
    // }

    $grid-width: 100px;

    $num-years: 4;
    $year-granularity: 12; // 2 = halfs, 4 = quarters, 12 = months

    $num-rows: 3;
    $base-year: 2015;

    $year-1st-half-map: (
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5
    );
    $year-2nd-half-map: (
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    );
    $year-map: map-merge($year-1st-half-map, $year-2nd-half-map);

    .temp {
        background-color: rgb(255, 0, 0);
    }

    .temp2 {
        background-color: rgb(178, 0, 255);
    }

    .temp3 {
        background: linear-gradient(to right, rgba(76, 226, 219, 0) 0%, rgb(29, 4, 255) 5rem, rgba(29, 4, 255, 1) calc(100% - 5rem), rgba(29, 4, 255, 0) 100%);
    }

    .timeline {
        // Variables
        --line-color: 31, 31, 31; // rgb(31, 31, 31)

        position: relative;
        width: 100%;
        height: 100%;

        display: grid;
        grid-template-columns: 2rem repeat(#{$num-years + 1}, 1fr) 2rem;
        grid-template-rows: repeat(#{$num-rows}, 1fr) 2rem;
        // grid-template-rows: repeat(#{$num-rows}, minmax(10rem, 30rem)) 2rem;

        .timeline-event-plane {
            grid-column: 1 / -1;
            grid-row: 1 / -2;

            display: grid; 
            grid-template-columns: 2rem repeat(#{(($num-years + 1) * $year-granularity)}, 1fr) 2rem;
            grid-template-rows: repeat(#{$num-rows}, 1fr);
        
            & .timeline-event {
                margin-top: 0.3rem;
                margin-bottom: 0.3rem;
                // padding-left: 4rem;

                position: relative;

                & span {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }

                // ---------------------------------
                // --- Setup timeline event tags ---
                // ---------------------------------

                // Time ranges
                @for $i from 0 through $num-years - 1 {
                    @each $month, $month-val in $year-map {

                        &.start-#{$base-year + $i}-#{$month} {
                            grid-column-start: #{6 + $i * $year-granularity + $month-val + 2};
                        }

                        &.end-#{$base-year + $i}-#{$month} {
                            grid-column-end: #{6 + $i * $year-granularity + $month-val + 2 + 1};
                        }
                    }
                }

                // Edge cases:

                // Half year before
                $i: -1;
                @each $month, $month-val in $year-2nd-half-map {

                    &.start-#{$base-year + $i}-#{$month} {
                        grid-column-start: #{ ($month-val - 6) + 2 };
                    }

                    &.end-#{$base-year + $i}-#{$month} {
                        grid-column-end: #{ ($month-val - 6) + 2 };
                    }
                }
                // Half year later
                $i: $num-years;
                @each $month, $month-val in $year-1st-half-map {

                    &.start-#{$base-year + $i}-#{$month} {
                        grid-column-start: #{ 6 + $i * $year-granularity + $month-val + 2 };
                    }

                    &.end-#{$base-year + $i}-#{$month} {
                        grid-column-end: #{ 6 + $i * $year-granularity + $month-val + 2 + 1};
                    }
                }

                // Past
                &.start-past {
                    grid-column-start: 1;
                }
                // Future
                &.end-future {
                    grid-column-end: -1;
                }

                // Order levels
                @for $i from 1 to $num-rows {
                    &.order-#{$i} {
                        grid-row: #{$i} / #{$i + 1};
                    }
                }
            }
        }

        .timeline-year-text {
            text-align: center;
            align-self: center;
        }

        @for $i from 1 through $num-years + 1 {
            .timeline-year-text.year-#{$i} {
                grid-column: #{$i + 1} / #{$i + 1};
                grid-row: -2 / -1;

                padding-top: 0.5rem;

                z-index: 3;
            }

            .line-vertical.line-#{$i} {
                grid-column: #{$i + 1} / #{$i + 1};
                grid-row: 1 / -1;

                z-index: 1;

                margin-right: auto;
                margin-left: auto;

                width: 2px;

                background: linear-gradient(to top, rgba(var(--line-color), 1) 0%, rgba(var(--line-color), 0) 100%);
            }
        }

        .line-horizontal {
            grid-row: -2 / -1;

            border-top: 2px solid rgba(var(--line-color), 1);

            z-index: 2;

            &.left {
                grid-column: 1 / 1;
                border-image: linear-gradient(to left, rgba(var(--line-color), 1) 0%, rgba(var(--line-color), 0) 100%);
                border-image-slice: 1;
            }

            &.center {
                grid-column: 2 / -2;
            }

            &.right {
                grid-column: -2 / -1;
                border-image: linear-gradient(to right, rgba(var(--line-color), 1) 0%, rgba(var(--line-color), 0) 100%);
                border-image-slice: 1;
            }
        }

    }
</style>
