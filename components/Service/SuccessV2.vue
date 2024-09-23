<script setup>
    const props = defineProps({
		data: {
            type: Object,
            required: true,
		},
	});
</script>
<template>
    <div class="h-full w-full flex flex-col justify-between items-center">
        <div></div>
        <div class="h-full w-full flex justify-center items-center relative bg-[url('/img/success-bg.png')] bg-no-repeat bg-cover bg-center">
            <div class="w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] flex justify-center items-center absolute">
                <svg width="799" height="799" viewBox="0 0 799 799" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                    <path d="M399.221 798.064C619.499 798.064 798.07 619.493 798.07 399.214C798.07 178.936 619.499 0.365234 399.221 0.365234C178.942 0.365234 0.371582 178.936 0.371582 399.214C0.371582 619.493 178.942 798.064 399.221 798.064Z" fill="url(#paint0_radial_2316_1371)" fill-opacity="0.1"/>
                    </g>
                    <path d="M685.785 399.213C685.785 556.203 557.489 683.457 399.215 683.457C240.955 683.457 112.655 556.208 112.655 399.213C112.655 242.229 240.955 114.965 399.215 114.965C557.489 114.965 685.785 242.229 685.785 399.213Z" fill="url(#paint1_linear_2316_1371)"/>
                    <path d="M685.785 400.697C685.785 556.869 559.188 683.456 403.025 683.456C246.863 683.456 120.271 556.869 120.271 400.697C120.271 244.535 246.863 117.942 403.025 117.942C559.188 117.942 685.785 244.535 685.785 400.697Z" fill="url(#paint2_linear_2316_1371)"/>
                    <path opacity="0.5" d="M685.785 400.697C685.785 556.869 559.188 683.456 403.025 683.456C246.863 683.456 120.271 556.869 120.271 400.697C120.271 244.535 246.863 117.942 403.025 117.942C559.188 117.942 685.785 244.535 685.785 400.697Z" fill="url(#paint3_linear_2316_1371)"/>
                    <defs>
                    <radialGradient id="paint0_radial_2316_1371" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(399.22 399.213) scale(398.85)">
                    <stop/>
                    <stop offset="0.3726"/>
                    <stop offset="0.5069"/>
                    <stop offset="0.6026"/>
                    <stop offset="0.68"/>
                    <stop offset="0.7463" stop-color="#191310"/>
                    <stop offset="0.805" stop-color="#302927"/>
                    <stop offset="0.8581" stop-color="#4B4341"/>
                    <stop offset="0.9069" stop-color="#706765"/>
                    <stop offset="0.9523" stop-color="#A49D9B"/>
                    <stop offset="0.9926" stop-color="#E8E6E5"/>
                    <stop offset="1" stop-color="white"/>
                    </radialGradient>
                    <linearGradient id="paint1_linear_2316_1371" x1="112.655" y1="399.209" x2="685.785" y2="399.209" gradientUnits="userSpaceOnUse">
                    <stop stop-color="white"/>
                    <stop offset="1" stop-color="white"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_2316_1371" x1="-71.5" y1="-27.5" x2="602.968" y2="600.639" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#4F4F4F"/>
                    <stop offset="0.1057" stop-color="#737373"/>
                    <stop offset="0.2495" stop-color="#9E9E9E"/>
                    <stop offset="0.396" stop-color="#C1C1C1"/>
                    <stop offset="0.5435" stop-color="#DCDCDC"/>
                    <stop offset="0.6923" stop-color="#F0F0F0"/>
                    <stop offset="0.8433" stop-color="#FBFBFB"/>
                    <stop offset="1" stop-color="white"/>
                    </linearGradient>
                    <linearGradient id="paint3_linear_2316_1371" x1="197.5" y1="195.17" x2="602.968" y2="600.639" gradientUnits="userSpaceOnUse">
                    <stop stop-color="white"/>
                    <stop offset="1" stop-color="white"/>
                    </linearGradient>
                    </defs>
                </svg>
            </div>
            <div class="w-[283px] h-[283px] lg:w-[565px] lg:h-[565px] flex justify-center items-center rounded-[50%] flex flex-col justify-center items-center bg-white">
                <div class="flex flex-col justify-center items-center absolute pt-8">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-[45px] w-[45px] lg:h-[102px] lg:w-[102px]" viewBox="0 0 102 102" fill="none">
                        <circle cx="50.8696" cy="50.9565" r="50.8696" fill="#00A65D"/>
                        <path d="M42.629 71C41.4684 71 40.3659 70.5424 39.5535 69.7415L23.1313 53.5532C21.4484 51.8943 21.4484 49.1486 23.1313 47.4897C24.8141 45.8308 27.5995 45.8308 29.2823 47.4897L42.629 60.6463L72.4559 31.2442C74.1388 29.5853 76.9242 29.5853 78.607 31.2442C80.2899 32.903 80.2899 35.6488 78.607 37.3076L45.7046 69.7415C44.8921 70.5424 43.7896 71 42.629 71Z" fill="white"/>
                    </svg>
                    <h1 class="text-[#009A67] text-[25px] lg:text-[50px] font-semibold pt-3 lg:pt-8">Congratulations!</h1>
                    <p class="text-[#4D5155] w-[300px] lg:w-[600px] text-[14px] lg:text-[22px] text-center">Your token has been generated successfully</p>
                    <h1 class="text-[#009A67] text-[20px] lg:text-[40px] font-bold pt-3 lg:pt-8">Token No:</h1>
                    <h1 class="text-[#009A67] text-3xl lg:text-5xl font-bold pt-0">{{ data?.token }}</h1>
                </div>
            </div>
        </div>
        <img class="pt-2 lg:pt-6" src="/img/success-footer.png" alt="">
    </div>
</template>