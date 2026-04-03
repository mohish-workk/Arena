const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.generateAdventure = async (req, res) => {
    const { prompt, preference } = req.body; // preference: 'retail', 'loop', 'rental'
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.warn("GEMINI_API_KEY missing. Falling back to mock response.");
        // Simulated Gemini AI Mock
        setTimeout(() => {
            const mockResponse = {
                location: "Pawna Lake Lakeside Campsite, Maharashtra",
                expectations: "A serene, heavily serviced location perfect for beginners. Expect calm waters, clear night skies, and mild temperatures ranging from 18°C to 25°C. The terrain is flat grass.",
                cartItems: preference === 'rental' ? ["rt2", "rt3"] : preference === 'loop' ? ["l1"] : ["r3"]
            };
            return res.status(200).json({ success: true, data: mockResponse });
        }, 1500);
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemInstruction = `
            You are "The Adventure Generator", an expert outdoor adventure guide for "Arena One".
            Your task is to analyze the user's trip prompt and suggest a location and gear list based on their preference: ${preference}.
            
            Preference Meanings:
            - "retail": They want to buy brand-new high-end gear.
            - "loop": They want to buy verified, pre-owned (second-hand) gear.
            - "rental": They want to rent gear for the duration of the trip.
            
            Return ONLY a valid JSON object with the following structure:
            {
                "location": "A specific beginner-friendly location name and region",
                "expectations": "A 2-sentence description of weather, terrain, and vibe",
                "cartItems": ["ID1", "ID2"]
            }
            
            Inventory IDs:
            RETAIL: "r1" (Cricket Bat), "r2" (Surf Wax), "r3" (Alpine Tent), "r4" (Climbing Harness)
            LOOP: "l1" (Cricket Ball), "l2" (Road Bike), "l3" (Yoga Mat)
            RENTAL: "rt1" (GoPro), "rt2" (Rucksack), "rt3" (Solar Station)
            
            The "cartItems" MUST ONLY contain IDs matching the user's preference: ${preference}.
        `;

        const result = await model.generateContent([systemInstruction, prompt]);
        const responseText = result.response.text();
        
        // Clean up possible markdown code blocks from AI response
        const cleanedText = responseText.replace(/```json|```/g, "").trim();
        const aiData = JSON.parse(cleanedText);

        res.status(200).json({
            success: true,
            data: aiData
        });

    } catch (error) {
        console.error("Gemini AI Error:", error);
        res.status(500).json({ success: false, message: "AI generation failed." });
    }
};
