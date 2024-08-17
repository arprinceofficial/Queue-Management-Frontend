<script setup>
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
    } from '@headlessui/vue'

    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true
        }
    });
</script>
<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-40">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/50" />
            </TransitionChild>
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle transition-all select-none">
                            <div aria-label="Loading..." role="status"
                                class="flex items-center justify-center space-x-2">
                                <svg class="h-20 w-20 animate-spin stroke-white" viewBox="0 0 256 256">
                                    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="24"></line>
                                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="24"></line>
                                    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="24">
                                    </line>
                                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="24"></line>
                                    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="24">
                                    </line>
                                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="24"></line>
                                    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="24"></line>
                                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="24">
                                    </line>
                                </svg>
                                <span class="text-4xl font-medium text-white">Loading...</span>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>