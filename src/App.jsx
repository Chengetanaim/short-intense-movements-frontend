import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Send, 
  X, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  MessageCircle,
  Search,
  CheckCircle2,
  Clock,
  UserCheck
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const RESEARCH_QUERIES = [
  "What did the Cell Reports Medicine study reveal about plasma protein changes?",
  "How much does 4.4 minutes of daily high-intensity movement reduce mortality risk?",
  "How does intense exercise improve insulin sensitivity at the cellular level?",
  "What medical precautions should individuals with cardiovascular conditions observe?"
];

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [openCitations, setOpenCitations] = useState({});
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check backend health
  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch(`${API_BASE_URL}/`);
        if (res.ok) {
          setBackendStatus('connected');
        } else {
          setBackendStatus('error');
        }
      } catch {
        setBackendStatus('offline');
      }
    }
    checkHealth();
  }, []);

  // Keyboard shortcut to close dialog on Esc
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isDialogOpen) {
        setIsDialogOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDialogOpen]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isDialogOpen]);

  // Auto scroll dialog messages
  useEffect(() => {
    if (isDialogOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isDialogOpen]);

  const toggleCitation = (index) => {
    setOpenCitations(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const openWithStudyQuery = (studyPrompt) => {
    setIsDialogOpen(true);
    if (studyPrompt) {
      handleSend(studyPrompt);
    }
  };

  const handleSend = async (questionToSend) => {
    const text = questionToSend || query;
    if (!text.trim() || loading) return;

    const userMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: text }),
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        text: data.answer,
        sources: data.sources || [],
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        text: `Unable to connect to RAG backend: ${error.message}. Please verify the FastAPI server is running.`,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top Journal Bar */}
      <div className="masthead-bar">
        <div className="masthead-left">
          <span className="masthead-tag">Scientific Dossier</span>
          <span>•</span>
          <span>Peer-Reviewed Exercise Physiology</span>
        </div>
        <div className="masthead-status">
          <span className="status-dot-green"></span>
          <span>{backendStatus === 'connected' ? 'Research Index Active' : 'API: Localhost:8000'}</span>
        </div>
      </div>

      <div className="article-page-shell">
        {/* Navigation */}
        <nav className="journal-nav">
          <a href="#" className="journal-logo">SIM Journal</a>
          <div className="journal-meta-nav">
            <button 
              className="journal-ask-btn"
              onClick={() => setIsDialogOpen(true)}
            >
              <Search size={14} />
              <span>Ask Study Assistant</span>
            </button>
          </div>
        </nav>

        {/* Article Headline & Header */}
        <header className="article-header">
          <div className="article-topic-kicker">Clinical Physiology & Longevity</div>
          <h1 className="article-main-title">
            Move Until You Catch Your Breath: The Cellular Power of Brief, Intense Bursts
          </h1>
          <p className="article-deck">
            New proteomic research reveals that just four minutes of breathless physical exertion triggers widespread molecular organ crosstalk — delivering physiological adaptations that traditional hour-long moderate workouts struggle to match.
          </p>

          <div className="article-byline-strip">
            <span className="byline-author">By Science & Medical Research Board</span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={13} /> 5 min read
            </span>
            <span>•</span>
            <span>Published in <em>Cell Reports Medicine</em> & <em>Nature Medicine</em></span>
          </div>
        </header>

        {/* Cinematic Lead Editorial Image */}
        <figure className="article-lead-image-container">
          <img 
            src="/hero-image.jpg" 
            alt="Individual briskly climbing modern architectural stairs in golden morning light"
            className="article-lead-image"
          />
          <figcaption className="image-caption">
            <span>Intermittent vigorous physical activity (VILPA) embeds breathless intervals into everyday commutes.</span>
            <span>Photography / SIM Editorial</span>
          </figcaption>
        </figure>

        {/* Article Long-Form Body */}
        <article className="article-prose-container">
          <p className="drop-cap-p">
            Leaving home at 7 a.m. to commute, sitting in front of a computer screen for hours on end, and returning home late in the evening — most professionals are familiar with the standard medical prescription to “exercise for at least 30 minutes a day.” Yet across modern work environments, time remains the ultimate constraint.
          </p>

          <p>
            Recent breakthroughs in exercise medicine offer a far more accessible and potent message: <strong>move intensely enough to catch your breath several times throughout the day, even if only for 30 to 60 seconds.</strong> Taking a steep flight of stairs at pace instead of the elevator, accelerating into a brisk uphill walk on a morning commute, or power-walking for two minutes after lunch fundamentally alters human cellular biochemistry.
          </p>

          {/* Key Clinical Findings Grid */}
          <div className="clinical-evidence-grid">
            <div className="evidence-box">
              <span className="evidence-metric">714 vs 7</span>
              <span className="evidence-label">Proteomic Expression Surges</span>
              <span className="evidence-sub">Plasma proteins governing vascular remodeling and fat metabolism in 3-minute sprints vs 90 minutes of moderate cycling.</span>
            </div>

            <div className="evidence-box">
              <span className="evidence-metric">30%–34%</span>
              <span className="evidence-label">Mortality Reduction</span>
              <span className="evidence-sub">Lower cardiovascular mortality risk observed in 25,241 adults engaging in just 4.4 minutes of daily vigorous activity.</span>
            </div>
          </div>

          <h2>The Molecular Emergency at the Cellular Level</h2>
          <p>
            Physical exercise is far more than mechanical muscular contraction. The cardiovascular system pumps greater blood volume, pulmonary exchange increases, the liver mobilizes glycogen stores, and adipose tissue sends out free fatty acids into systemic circulation.
          </p>

          <div className="editorial-pullquote">
            <div className="quote-text">
              “The moment vigorous exercise begins, a molecular dialogue opens across the entire body: muscles, adipose tissue, liver, vascular endothelium, and brain exchange signaling metabolites simultaneously.”
            </div>
          </div>

          <p>
            High-intensity movement represents an energy emergency at the cellular level. Mitochondria — the metabolic powerhouses inside muscle cells — are instantly recruited to ramp up ATP generation. Circulating blood glucose is consumed at accelerated rates, causing skeletal muscle to rapidly clear carbohydrates and dramatically enhancing long-term insulin sensitivity.
          </p>

          {/* Editorial Section Photo */}
          <div className="editorial-photo-break">
            <img 
              src="/section-image.jpg" 
              alt="Laboratory research and natural physiology study"
            />
          </div>

          {/* Study 1 Dossier Card with Interactive Action */}
          <div className="study-dossier-card">
            <div className="dossier-body">
              <h4>Study Highlight: Cell Reports Medicine Proteomic Analysis</h4>
              <p>
                Researchers evaluated 19 healthy men across 2,884 plasma proteins. The high-intensity interval cohort exhibited surges in 714 proteins related to growth hormone regulation, vascular tissue repair, and lipid turnover, compared to just 7 in the continuous moderate group.
              </p>
            </div>
            <button 
              className="study-ask-action"
              onClick={() => openWithStudyQuery("What did the Cell Reports Medicine study reveal about plasma protein changes?")}
            >
              <Search size={13} />
              <span>Ask Study Assistant</span>
            </button>
          </div>

          <h2>Epidemiological Evidence: The 4.4-Minute Benchmark</h2>
          <p>
            Because sustained sprinting is impractical throughout a typical workday, researchers have focused on <em>Vigorous Intermittent Lifestyle Physical Activity (VILPA)</em> — short, breathless bursts such as running to catch transit or carrying heavy groceries up a hill.
          </p>

          <p>
            A landmark investigation published in <em>Nature Medicine</em> tracked 25,241 adults (mean age 62) over seven years using calibrated wearable sensors. The data revealed that participants who averaged just <strong>4.4 minutes of daily high-intensity intermittent movement</strong> experienced a <strong>26–30% lower overall mortality risk</strong> and a <strong>32–34% lower cardiovascular mortality risk</strong> compared to individuals with no vigorous movement.
          </p>

          {/* Study 2 Dossier Card */}
          <div className="study-dossier-card">
            <div className="dossier-body">
              <h4>Study Highlight: Nature Medicine 7-Year Longitudinal Cohort</h4>
              <p>
                Wearable device tracking of 25,241 non-exercisers proved that brief, daily cumulative bursts of breathless movement confer profound cardiovascular and longevity protection.
              </p>
            </div>
            <button 
              className="study-ask-action"
              onClick={() => openWithStudyQuery("How much does 4.4 minutes of daily high-intensity movement reduce mortality risk?")}
            >
              <Search size={13} />
              <span>Ask Study Assistant</span>
            </button>
          </div>

          <h2>Reframing the Daily Standard</h2>
          <p>
            The emerging consensus in exercise physiology encourages individuals to shift their mental yardstick from <em>“Did I complete an hour at the gym?”</em> to <strong>“How many times did I move intensely enough to catch my breath today?”</strong>
          </p>

          {/* Caution Box */}
          <div className="clinical-caution-box">
            <div className="caution-heading">Clinical Guidance & Precautions</div>
            <p>
              Individuals with diagnosed hypertension, diabetes, coronary artery disease, or those experiencing symptoms such as chest pressure, acute dizziness, or severe shortness of breath during exertion should consult a physician before initiating high-intensity routines.
            </p>
          </div>
        </article>

        {/* Footer */}
        <footer className="article-footer">
          <p>SIM Journal • Domain-Specific RAG Knowledge Engine with Google Gemini & ChromaDB</p>
          <p style={{ marginTop: '0.4rem', color: '#A3998E' }}>
            Sources: Cell Reports Medicine (2024) • Nature Medicine (2022)
          </p>
        </footer>
      </div>

      {/* Discreet Floating Study Assistant Pill */}
      <button 
        className="floating-assistant-pill"
        onClick={() => setIsDialogOpen(true)}
        aria-label="Ask Study Assistant"
      >
        <MessageCircle size={16} />
        <span>Ask Study Assistant</span>
      </button>

      {/* =========================================
          RESEARCH STUDY ASSISTANT MODAL DIALOG
      ========================================= */}
      {isDialogOpen && (
        <div 
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDialogOpen(false);
          }}
        >
          <div className="modal-card" role="dialog" aria-modal="true">
            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-text">
                <h3>Study Research Assistant</h3>
                <p>Peer-Reviewed Grounding • ChromaDB & Gemini 3.5</p>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setIsDialogOpen(false)}
                aria-label="Close Modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {/* Starter Questions */}
              {messages.length === 0 && (
                <div className="modal-suggestions">
                  <div className="modal-suggestions-label">Explore Documented Research Queries</div>
                  <div className="modal-pills">
                    {RESEARCH_QUERIES.map((qText, idx) => (
                      <button
                        key={idx}
                        className="modal-pill-btn"
                        disabled={loading}
                        onClick={() => handleSend(qText)}
                      >
                        <span>{qText}</span>
                        <ArrowRight size={13} color="#8C847A" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message History */}
              {messages.map((m, idx) => (
                <div key={idx} className={`chat-bubble-entry ${m.role}`}>
                  <div className="bubble-author">
                    {m.role === 'user' ? 'Your Inquiry' : 'Verified Literature Synthesis'}
                  </div>
                  <div className="bubble-text">{m.text}</div>

                  {/* Sources Drawer */}
                  {m.sources && m.sources.length > 0 && (
                    <div className="bubble-citations">
                      <button 
                        className="citations-expand-btn"
                        onClick={() => toggleCitation(idx)}
                      >
                        <FileText size={13} />
                        <span>{m.sources.length} Retrieved ChromaDB Passages</span>
                        {openCitations[idx] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {openCitations[idx] && (
                        <div className="citation-cards-group">
                          {m.sources.map((src, sIdx) => (
                            <div key={sIdx} className="citation-paper-card">
                              <strong>Excerpt #{sIdx + 1}</strong>
                              {src.content}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicator */}
              {loading && (
                <div className="modal-loading-box">
                  <div className="editorial-spinner"></div>
                  <span>Searching indexed literature & synthesizing response...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="modal-footer-input">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="input-pill-shell"
              >
                <input
                  ref={inputRef}
                  type="text"
                  className="input-pill-field"
                  placeholder="Ask a question about the scientific findings..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  className="input-send-circle"
                  disabled={!query.trim() || loading}
                  aria-label="Send Query"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
