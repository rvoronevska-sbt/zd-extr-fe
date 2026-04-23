import { ref } from 'vue';
import { useTicketDataStore } from '@/stores/ticketData';
import { cleanAndFormatString } from '@/utils/stringUtils';
import { logger } from '@/utils/logger';

const USE_MOCKED = import.meta.env.VITE_USE_MOCKED_DATA === 'true';

export function useTranscriptDialog() {
    const dialog = ref({ visible: false, type: '', transcript: '', date: null, isLoadingTranscript: false });

    async function openDialog(type, transcriptOrTicketId, timestamp) {
        if (USE_MOCKED) {
            dialog.value = {
                visible: true,
                type,
                transcript: cleanAndFormatString(transcriptOrTicketId) || transcriptOrTicketId,
                date: timestamp,
                isLoadingTranscript: false
            };
        } else {
            dialog.value = { visible: true, type, transcript: '', date: timestamp, isLoadingTranscript: true };
            try {
                const ticketDataStore = useTicketDataStore();
                const detail = await ticketDataStore.fetchTicketById(transcriptOrTicketId);
                const text = type === 'Chat' ? detail.chat_transcript : detail.email_transcript;
                dialog.value.transcript = cleanAndFormatString(text) || text || 'No transcript available.';
            } catch (err) {
                dialog.value.transcript = 'Failed to load transcript.';
                logger.error('Failed to fetch transcript:', err);
            } finally {
                dialog.value.isLoadingTranscript = false;
            }
        }
    }

    return { dialog, openDialog };
}
