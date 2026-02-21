import NoteSection from './NoteSection';

export default function FragranceNotes() {
    return (
        <section id="notes" className="relative bg-black">
            <NoteSection
                type="Top Notes"
                title="First Impression"
                description="Bright citrus and delicate florals dance on the skin, creating an immediate sense of freshness and allure."
                ingredients={['Bergamot', 'Neroli', 'Pink Pepper']}
                imageSrc="/assets/generated/rose-abstract.dim_600x600.png"
                imageAlt="Rose abstract visual"
            />
            
            <NoteSection
                type="Heart Notes"
                title="The Soul"
                description="Rich and complex, the heart reveals layers of precious rose and exotic spices, embodying depth and character."
                ingredients={['Bulgarian Rose', 'Jasmine', 'Cardamom']}
                imageSrc="/assets/generated/oud-abstract.dim_600x600.png"
                imageAlt="Oud abstract visual"
            />
            
            <NoteSection
                type="Base Notes"
                title="Lasting Memory"
                description="Warm amber and rare oud create a foundation of timeless elegance, lingering long after you've left the room."
                ingredients={['Oud Wood', 'Amber', 'Sandalwood']}
                imageSrc="/assets/generated/amber-abstract.dim_600x600.png"
                imageAlt="Amber abstract visual"
                isLast
            />
        </section>
    );
}
