"use client";
import React, { useState, useRef, useEffect } from 'react';
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { getAllProducts, Product } from "@/data/productStore";
import { ArrowLeft, Mic, Square, Trash2, ShieldCheck, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

export default function OrderPage() {
    const routeParams = useParams();
    const searchParams = useSearchParams();
    const productId = parseInt(routeParams?.id as string);

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        message: ''
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Voice recording states
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const allProducts = getAllProducts();
        const foundProduct = allProducts.find(p => p.id === productId);
        setProduct(foundProduct || null);
        setIsLoaded(true);
    }, [productId]);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <p className="text-xl mb-4">Product not found</p>
                    <Link href="/categories" className="text-primary hover:underline">
                        Browse Collection
                    </Link>
                </div>
            </div>
        );
    }

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setAudioBlob(audioBlob);
                setAudioUrl(URL.createObjectURL(audioBlob));
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingDuration(0);

            timerRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please allow microphone permission.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const deleteRecording = () => {
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
        setAudioBlob(null);
        setAudioUrl(null);
        setRecordingDuration(0);
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const phone = "9997631117";
            let message = `*New Order Request*\n\n*Product:* ${product.name}\n*Gram Wise Order*\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nNote: ${formData.message}`;

            // Helper to upload file
            const uploadFile = async (file: File | Blob, filename: string) => {
                const data = new FormData();
                data.append('file', file, filename);
                const res = await fetch('/api/upload/file', { method: 'POST', body: data });
                if (!res.ok) throw new Error('Upload failed');
                const json = await res.json();
                return json.url;
            };

            // Upload Attachments
            if (audioBlob) {
                try {
                    const audioUrl = await uploadFile(audioBlob, 'voice-message.webm');
                    message += `\n\n🎤 *Voice Message:* ${window.location.origin}${audioUrl}`;
                } catch (err) {
                    console.error('Audio upload failed', err);
                    message += "\n\n(Voice message upload failed, please send manually)";
                }
            }

            if (imageFile) {
                try {
                    const imageUrl = await uploadFile(imageFile, imageFile.name);
                    message += `\n\n📷 *Reference Image:* ${window.location.origin}${imageUrl}`;
                } catch (err) {
                    console.error('Image upload failed', err);
                    message += "\n\n(Image upload failed, please send manually)";
                }
            }

            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error optimizing order:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-body transition-colors duration-300" >
            <Header />

            <main className="max-w-2xl mx-auto pb-24 px-4 pt-6">
                {/* Back Button */}
                <Link
                    href={`/product/${productId}`}
                    className="inline-flex items-center gap-2 text-text-sub-light dark:text-text-sub-dark hover:text-primary mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Product
                </Link>

                {/* Product Summary Card */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 p-4 mb-6 flex gap-4">
                    <img
                        src={product.image || "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=400"}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-xl"
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=400";
                        }}
                    />
                    <div className="flex-1">
                        <h3 className="font-display font-bold text-lg text-text-main-light dark:text-text-main-dark">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-text-sub-light">
                            <span className="flex items-center gap-1 text-green-600"><ShieldCheck className="w-3 h-3" /> {product.purity || 'Premium Quality'}</span>
                        </div>
                    </div>
                </div>

                {/* Order Form */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 p-6">
                    <h1 className="font-display text-2xl font-bold mb-1 text-text-main-light dark:text-text-main-dark">Complete Your Order</h1>
                    <p className="text-sm text-text-sub-light mb-6">Please fill in your details to proceed on WhatsApp.</p>

                    <form onSubmit={handleOrderSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-sub-light mb-2">Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-sub-light mb-2">Phone Number</label>
                            <input
                                required
                                type="tel"
                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="+91 99999 99999"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-sub-light mb-2">Delivery Address</label>
                            <textarea
                                required
                                rows={3}
                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                placeholder="Enter full delivery address"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-sub-light mb-2">Message (Optional)</label>
                            <textarea
                                rows={2}
                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                placeholder="Any specific requirements?"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        {/* Image Upload Section */}
                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:border-primary/50 transition-colors">
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-sub-light mb-4">
                                📷 Reference Image (Optional)
                            </label>

                            {!imageFile ? (
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setImageFile(e.target.files[0]);
                                            }
                                        }}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="flex flex-col items-center justify-center gap-2 py-4 bg-gray-50 dark:bg-black/20 rounded-xl group-hover:bg-primary/5 transition-colors">
                                        <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm text-primary">
                                            <ImageIcon className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-medium text-text-sub-light">Click to upload an image</span>
                                        <span className="text-xs text-gray-400">JPG, PNG up to 5MB</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 bg-white dark:bg-black/20 rounded-xl p-3 border border-green-100 dark:border-green-900/30">
                                    <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden relative">
                                        <img
                                            src={URL.createObjectURL(imageFile)}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{imageFile.name}</p>
                                        <p className="text-xs text-green-600 font-medium">Ready to attach</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setImageFile(null)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Voice Recording Section */}
                        <div className="border-2 border-dashed border-primary/30 rounded-2xl p-5 bg-primary/5">
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-sub-light mb-4">
                                🎤 Voice Message (Optional)
                            </label>

                            {!audioUrl ? (
                                <div className="flex items-center justify-center">
                                    {!isRecording ? (
                                        <button
                                            type="button"
                                            onClick={startRecording}
                                            className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/30"
                                        >
                                            <Mic className="w-5 h-5" />
                                            <span>Record Voice Message</span>
                                        </button>
                                    ) : (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="flex items-center gap-3">
                                                <span className="relative flex h-4 w-4">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                                                </span>
                                                <span className="text-red-500 font-bold text-2xl font-mono">{formatDuration(recordingDuration)}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={stopRecording}
                                                className="flex items-center gap-2 bg-red-500 text-white px-8 py-4 rounded-full font-bold hover:bg-red-600 transition-all animate-pulse"
                                            >
                                                <Square className="w-5 h-5 fill-current" />
                                                <span>Stop Recording</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 bg-white dark:bg-black/20 rounded-xl p-4">
                                    <audio src={audioUrl} controls className="flex-1 h-12" />
                                    <button
                                        type="button"
                                        onClick={deleteRecording}
                                        className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                        title="Delete recording"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            )}

                            <p className="text-xs text-center text-text-sub-light/60 mt-3">
                                Record your specific requirements in your preferred language
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all text-lg"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>Proceed to WhatsApp</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </main>

            <BottomNav />
        </div >
    );
}
