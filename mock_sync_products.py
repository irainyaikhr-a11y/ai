import requests
import json

def sync_honey_products():
    # Products to add
    honey_products = [
        {
            "id": "honey_sidr",
            "title": "عسل السدر الملكي",
            "category": "عسل",
            "tags": ["عسل", "سدر", "ملكي", "طبيعي"],
            "description": "أجود أنواع عسل السدر اليمني الأصلي، مفيد جداً للمناعة والطاقة."
        },
        {
            "id": "honey_eucalyptus",
            "title": "عسل الكالبتوس",
            "category": "عسل",
            "tags": ["عسل", "كالبتوس", "تنفس", "طبيعي"],
            "description": "عسل طبيعي مستخلص من أزهار الكالبتوس، رائع للجهاز التنفسي."
        },
        {
            "id": "honey_thyme",
            "title": "عسل الزعتر الحر",
            "category": "عسل",
            "tags": ["عسل", "زعتر", "حر", "أعشاب"],
            "description": "عسل الزعتر الجبلي، يتميز برائحته القوية وفوائده الهضمية."
        },
        {
            "id": "honey_daghmous",
            "title": "عسل الدغموس الأصلي",
            "category": "عسل",
            "tags": ["عسل", "دغموس", "حرارة", "علاج"],
            "description": "عسل الدغموس المغربي المعروف بحرارته وفوائده العلاجية الكبيرة."
        },
        {
            "id": "honey_orange",
            "title": "عسل الليمون (البرتقال)",
            "category": "عسل",
            "tags": ["عسل", "ليمون", "برتقال", "خفيف"],
            "description": "عسل خفيف ومنعش، يحبه الأطفال ومفيد جداً للتهدئة."
        },
        {
            "id": "honey_multiflora",
            "title": "عسل الأعشاب المتنوعة",
            "category": "عسل",
            "tags": ["عسل", "أعشاب", "متنوع", "طبيعي"],
            "description": "مزيج من رحيق أزهار برية متنوعة، طعم غني وفوائد شاملة."
        },
        {
            "id": "pollen_grains",
            "title": "حبوب اللقاح الطبيعية",
            "category": "مكملات",
            "tags": ["مكمل", "لقاح", "طاقة", "بروتين"],
            "description": "حبوب لقاح النحل الطبيعية، منجم للفيتامينات والمعادن."
        },
        {
            "id": "royal_jelly",
            "title": "غذاء ملكات النحل",
            "category": "مكملات",
            "tags": ["مكمل", "غذاء_ملكات", "خصوبة", "نشاط"],
            "description": "غذاء ملكات النحل الصافي، لزيادة النشاط والخصوبة وتقوية الجسم."
        }
    ]

    print("🚀 Syncing Honey Products to AI Engine...")
    
    # We can't call the API directly to add content if it doesn't have an endpoint for it
    # But we can modify the engine directly since we are on the same machine
    from advanced_ai_recommender import AdvancedAIRecommender
    import os

    DATA_FILE = 'real_demo_data.json'
    engine = AdvancedAIRecommender()
    
    if os.path.exists(DATA_FILE):
        engine.load_from_file(DATA_FILE)
    
    for p in honey_products:
        engine.add_content(p['id'], p['title'], p['category'], p['tags'], p['description'])
        print(f"✅ Added: {p['title']}")
    
    # Add some interactions for the demo users to these products
    engine.record_interaction("ahmed", "honey_sidr", "view", rating=5)
    engine.record_interaction("ahmed", "honey_eucalyptus", "view", rating=4)
    
    engine.record_interaction("sara", "honey_orange", "view", rating=5)
    engine.record_interaction("sara", "honey_multiflora", "view", rating=4)
    
    engine.record_interaction("omar", "honey_thyme", "view", rating=5)
    engine.record_interaction("omar", "honey_daghmous", "view", rating=3)

    engine.save_to_file(DATA_FILE)
    print(f"\n✨ Sync Complete! Data saved to {DATA_FILE}")

if __name__ == "__main__":
    sync_honey_products()
