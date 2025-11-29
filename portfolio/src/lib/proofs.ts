// ═══════════════════════════════════════════════════════════════════════════════
// MATHEMATICAL PROOFS DATA - For Animated Blackboard Hero
// Seven famous proofs with full derivations for chalk-writing animation
// ═══════════════════════════════════════════════════════════════════════════════

export interface ProofLine {
  id: string;
  content?: string;          // Text content (may include LaTeX in $..$ format)
  latex?: string;            // Pure LaTeX for mathematical expressions
  type: 'title' | 'statement' | 'text' | 'equation' | 'step' | 'conclusion' | 'annotation';
  indent: number;            // Indentation level (0-3)
  delay?: number;            // Custom delay before this line (ms)
  duration?: number;         // Custom duration for this line (ms)
  emphasis?: boolean;        // Draw box around this line
}

export interface ProofData {
  id: string;
  title: string;
  shortStatement: string;
  accessibleSummary: string;
  field: string;
  year?: number;
  mathematician?: string;
  difficulty: 'accessible' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in seconds
  lines: ProofLine[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// THE SEVEN PROOFS
// ═══════════════════════════════════════════════════════════════════════════════

export const PROOFS: ProofData[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. FUNDAMENTAL THEOREM OF GALOIS THEORY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'galois_fundamental',
    title: 'Fundamental Theorem of Galois Theory',
    shortStatement: 'Gal(E/F) ≅ Aut_F(E)',
    accessibleSummary: 'The Fundamental Theorem of Galois Theory establishes a perfect correspondence between the intermediate fields of a Galois extension and the subgroups of its Galois group. This correspondence reverses inclusion: larger subgroups correspond to smaller fields.',
    field: 'Abstract Algebra',
    year: 1832,
    mathematician: 'Évariste Galois',
    difficulty: 'advanced',
    estimatedDuration: 28,
    lines: [
      { id: 'g1', type: 'title', content: 'Fundamental Theorem of Galois Theory', indent: 0 },
      { id: 'g2', type: 'statement', content: 'Let E/F be finite Galois with group G = Gal(E/F).', indent: 0, delay: 400 },
      { id: 'g3', type: 'text', content: 'Define two maps:', indent: 0 },
      { id: 'g4', type: 'equation', latex: '\\Phi: \\{\\text{intermediate fields } K\\} \\to \\{\\text{subgroups } H \\leq G\\}', indent: 1 },
      { id: 'g5', type: 'equation', latex: 'K \\mapsto \\text{Gal}(E/K) = \\{\\sigma \\in G : \\sigma(k) = k \\ \\forall k \\in K\\}', indent: 2 },
      { id: 'g6', type: 'equation', latex: '\\Psi: \\{\\text{subgroups } H \\leq G\\} \\to \\{\\text{intermediate fields } K\\}', indent: 1 },
      { id: 'g7', type: 'equation', latex: 'H \\mapsto E^H = \\{x \\in E : \\sigma(x) = x \\ \\forall \\sigma \\in H\\}', indent: 2 },
      { id: 'g8', type: 'text', content: 'Claim: Φ and Ψ are mutual inverses.', indent: 0, delay: 600 },
      { id: 'g9', type: 'step', content: '(i) Ψ(Φ(K)) = E^{Gal(E/K)} = K', indent: 1 },
      { id: 'g10', type: 'annotation', content: 'E/K is Galois, so E^{Gal(E/K)} = K by definition. ✓', indent: 2 },
      { id: 'g11', type: 'step', content: '(ii) Φ(Ψ(H)) = Gal(E/E^H) = H', indent: 1 },
      { id: 'g12', type: 'annotation', content: 'By Artin\'s theorem on fixed fields. ✓', indent: 2 },
      { id: 'g13', type: 'text', content: 'Degree correspondence:', indent: 0, delay: 400 },
      { id: 'g14', type: 'equation', latex: '[K : F] = [G : \\text{Gal}(E/K)] = |G|/|\\text{Gal}(E/K)|', indent: 1 },
      { id: 'g15', type: 'text', content: 'Normality criterion:', indent: 0 },
      { id: 'g16', type: 'equation', latex: 'K/F \\text{ is normal} \\iff \\text{Gal}(E/K) \\trianglelefteq G', indent: 1 },
      { id: 'g17', type: 'conclusion', content: '∴ The lattice of intermediate fields is anti-isomorphic to the lattice of subgroups of G. □', indent: 0, emphasis: true },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. BROUWER FIXED POINT THEOREM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'brouwer_fixed_point',
    title: 'Brouwer Fixed Point Theorem',
    shortStatement: 'f: Dⁿ → Dⁿ ⟹ ∃x: f(x) = x',
    accessibleSummary: 'The Brouwer Fixed Point Theorem states that any continuous function from a ball to itself must have at least one point that maps to itself. The proof shows that a retraction from the ball to its boundary sphere is impossible.',
    field: 'Algebraic Topology',
    year: 1911,
    mathematician: 'L.E.J. Brouwer',
    difficulty: 'intermediate',
    estimatedDuration: 25,
    lines: [
      { id: 'b1', type: 'title', content: 'Brouwer Fixed Point Theorem', indent: 0 },
      { id: 'b2', type: 'statement', content: 'Theorem: Every continuous f: Dⁿ → Dⁿ has a fixed point.', indent: 0, delay: 400 },
      { id: 'b3', type: 'annotation', content: '(Dⁿ = closed unit ball in ℝⁿ)', indent: 1 },
      { id: 'b4', type: 'text', content: 'Proof by contradiction:', indent: 0, delay: 300 },
      { id: 'b5', type: 'step', content: 'Suppose f has no fixed point, i.e., f(x) ≠ x for all x ∈ Dⁿ.', indent: 1 },
      { id: 'b6', type: 'text', content: 'Construction: Define r: Dⁿ → Sⁿ⁻¹ as follows:', indent: 0, delay: 400 },
      { id: 'b7', type: 'step', content: 'For each x ∈ Dⁿ, draw the ray from f(x) through x.', indent: 1 },
      { id: 'b8', type: 'step', content: 'Let r(x) = the point where this ray hits the boundary Sⁿ⁻¹.', indent: 1 },
      { id: 'b9', type: 'annotation', content: 'Well-defined since f(x) ≠ x by assumption.', indent: 2 },
      { id: 'b10', type: 'text', content: 'Properties of r:', indent: 0, delay: 300 },
      { id: 'b11', type: 'step', content: '(i) r is continuous (ray construction varies continuously)', indent: 1 },
      { id: 'b12', type: 'step', content: '(ii) r(x) = x for all x ∈ Sⁿ⁻¹ (ray starts at boundary point)', indent: 1 },
      { id: 'b13', type: 'text', content: '∴ r is a retraction of Dⁿ onto Sⁿ⁻¹', indent: 0 },
      { id: 'b14', type: 'text', content: 'But this is impossible!', indent: 0, delay: 500, emphasis: true },
      { id: 'b15', type: 'step', content: 'If r: Dⁿ → Sⁿ⁻¹ is a retraction, then r ∘ i = id_{Sⁿ⁻¹}', indent: 1 },
      { id: 'b16', type: 'equation', latex: 'H_{n-1}(S^{n-1}) \\cong \\mathbb{Z} \\text{ but } H_{n-1}(D^n) = 0', indent: 1 },
      { id: 'b17', type: 'step', content: 'So r* ∘ i* factors through 0, cannot be identity.', indent: 1 },
      { id: 'b18', type: 'conclusion', content: 'Contradiction! ∴ f must have a fixed point. □', indent: 0, emphasis: true },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. URYSOHN'S LEMMA
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'urysohn_lemma',
    title: 'Urysohn\'s Lemma',
    shortStatement: 'A,B closed disjoint ⟹ ∃f: X → [0,1]',
    accessibleSummary: 'Urysohn\'s Lemma proves that in a normal topological space, any two disjoint closed sets can be separated by a continuous real-valued function. The proof constructs nested open sets indexed by dyadic rationals.',
    field: 'Topology',
    year: 1925,
    mathematician: 'Pavel Urysohn',
    difficulty: 'intermediate',
    estimatedDuration: 26,
    lines: [
      { id: 'u1', type: 'title', content: 'Urysohn\'s Lemma', indent: 0 },
      { id: 'u2', type: 'statement', content: 'Given: X normal space, A and B disjoint closed sets.', indent: 0, delay: 400 },
      { id: 'u3', type: 'statement', content: 'Goal: Find continuous f: X → [0,1] with f|_A = 0, f|_B = 1.', indent: 0 },
      { id: 'u4', type: 'text', content: 'Key idea: Build nested open sets indexed by dyadic rationals.', indent: 0, delay: 500 },
      { id: 'u5', type: 'equation', latex: 'D = \\{k/2^n : k,n \\in \\mathbb{Z}, 0 \\leq k/2^n \\leq 1\\}', indent: 1 },
      { id: 'u6', type: 'text', content: 'Construction of open sets {U_r}_{r ∈ D}:', indent: 0, delay: 400 },
      { id: 'u7', type: 'step', content: 'Start: U₁ = X \\ B (open since B closed)', indent: 1 },
      { id: 'u8', type: 'annotation', content: 'A ⊆ U₁, B ∩ U₁ = ∅', indent: 2 },
      { id: 'u9', type: 'step', content: 'By normality: ∃ open U₀ with A ⊆ U₀ ⊆ cl(U₀) ⊆ U₁', indent: 1 },
      { id: 'u10', type: 'text', content: 'Inductively for each dyadic r:', indent: 0 },
      { id: 'u11', type: 'step', content: 'Given U_r and U_s with r < s adjacent at stage n,', indent: 1 },
      { id: 'u12', type: 'step', content: 'use normality to find U_t (t = (r+s)/2) with:', indent: 1 },
      { id: 'u13', type: 'equation', latex: '\\overline{U_r} \\subseteq U_t \\subseteq \\overline{U_t} \\subseteq U_s', indent: 2 },
      { id: 'u14', type: 'text', content: 'Define f: X → [0,1] by:', indent: 0, delay: 500 },
      { id: 'u15', type: 'equation', latex: 'f(x) = \\inf\\{r \\in D : x \\in U_r\\} \\quad (\\inf \\emptyset = 1)', indent: 1, emphasis: true },
      { id: 'u16', type: 'step', content: 'Check: f(a) = 0 for a ∈ A (since A ⊆ U_r for all r > 0)', indent: 1 },
      { id: 'u17', type: 'step', content: 'Check: f(b) = 1 for b ∈ B (since b ∉ U_r for all r < 1)', indent: 1 },
      { id: 'u18', type: 'text', content: 'Continuity of f:', indent: 0, delay: 400 },
      { id: 'u19', type: 'equation', latex: 'f^{-1}([0,\\alpha)) = \\bigcup_{r<\\alpha} U_r \\text{ (open)}', indent: 1 },
      { id: 'u20', type: 'equation', latex: 'f^{-1}((\\alpha,1]) = \\bigcup_{r>\\alpha} (X \\setminus \\overline{U_r}) \\text{ (open)}', indent: 1 },
      { id: 'u21', type: 'conclusion', content: 'Subbase for [0,1] topology, so f is continuous. □', indent: 0, emphasis: true },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. PRIME NUMBER THEOREM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'prime_number_theorem',
    title: 'Prime Number Theorem',
    shortStatement: 'π(x) ~ x/ln(x)',
    accessibleSummary: 'The Prime Number Theorem describes how prime numbers are distributed among the integers: approximately x divided by the natural logarithm of x primes exist below x. The proof connects prime distribution to the Riemann zeta function.',
    field: 'Number Theory',
    year: 1896,
    mathematician: 'Hadamard & de la Vallée Poussin',
    difficulty: 'advanced',
    estimatedDuration: 30,
    lines: [
      { id: 'p1', type: 'title', content: 'Prime Number Theorem', indent: 0 },
      { id: 'p2', type: 'statement', content: 'Theorem: π(x) ~ x/ln(x) as x → ∞', indent: 0, delay: 400 },
      { id: 'p3', type: 'annotation', content: 'where π(x) = #{primes p ≤ x}', indent: 1 },
      { id: 'p4', type: 'text', content: 'Key tool: Riemann zeta function', indent: 0, delay: 500 },
      { id: 'p5', type: 'equation', latex: '\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s} = \\prod_p \\left(1 - p^{-s}\\right)^{-1} \\quad (\\text{Re}(s) > 1)', indent: 1, emphasis: true },
      { id: 'p6', type: 'annotation', content: 'Euler product encodes prime distribution!', indent: 1 },
      { id: 'p7', type: 'text', content: 'Taking logarithmic derivative:', indent: 0 },
      { id: 'p8', type: 'equation', latex: '-\\frac{\\zeta\'(s)}{\\zeta(s)} = \\sum_p \\sum_{k=1}^{\\infty} \\frac{\\ln p}{p^{ks}}', indent: 1 },
      { id: 'p9', type: 'text', content: 'Analytic continuation:', indent: 0, delay: 400 },
      { id: 'p10', type: 'step', content: 'ζ(s) extends meromorphically to ℂ', indent: 1 },
      { id: 'p11', type: 'step', content: 'Simple pole at s = 1 (residue 1)', indent: 1 },
      { id: 'p12', type: 'text', content: 'Explicit formula (von Mangoldt):', indent: 0, delay: 400 },
      { id: 'p13', type: 'equation', latex: '\\psi(x) = \\sum_{n \\leq x} \\Lambda(n) = x - \\sum_\\rho \\frac{x^\\rho}{\\rho} - \\ln(2\\pi) - \\frac{1}{2}\\ln(1-x^{-2})', indent: 1 },
      { id: 'p14', type: 'annotation', content: 'where ρ runs over nontrivial zeros of ζ(s)', indent: 2 },
      { id: 'p15', type: 'text', content: 'Critical step: ζ(s) has NO zeros on Re(s) = 1', indent: 0, delay: 500, emphasis: true },
      { id: 'p16', type: 'step', content: 'Use: ζ³(σ)·ζ⁴(σ+it)·ζ(σ+2it) has non-negative coefficients', indent: 1 },
      { id: 'p17', type: 'step', content: 'If ζ(1+it) = 0, contradiction as σ → 1⁺', indent: 1 },
      { id: 'p18', type: 'text', content: 'From zero-free region on Re(s) = 1:', indent: 0, delay: 400 },
      { id: 'p19', type: 'equation', latex: '\\psi(x) \\sim x \\quad \\text{(prime powers grow like } x\\text{)}', indent: 1 },
      { id: 'p20', type: 'text', content: 'By partial summation:', indent: 0 },
      { id: 'p21', type: 'equation', latex: '\\pi(x) = \\frac{\\psi(x)}{\\ln x} + \\int_2^x \\frac{\\psi(t)}{t \\cdot \\ln^2 t}\\, dt \\sim \\frac{x}{\\ln x}', indent: 1 },
      { id: 'p22', type: 'conclusion', content: '∴ π(x) ~ x/ln(x) □', indent: 0, emphasis: true },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. GAUSS-BONNET THEOREM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'gauss_bonnet',
    title: 'Gauss-Bonnet Theorem',
    shortStatement: '∫∫_M K dA = 2πχ(M)',
    accessibleSummary: 'The Gauss-Bonnet Theorem relates the total curvature of a surface to its topological shape as measured by the Euler characteristic. The proof triangulates the surface and applies local curvature formulas.',
    field: 'Differential Geometry',
    year: 1848,
    mathematician: 'Carl Friedrich Gauss & Pierre Ossian Bonnet',
    difficulty: 'intermediate',
    estimatedDuration: 29,
    lines: [
      { id: 'gb1', type: 'title', content: 'Gauss-Bonnet Theorem', indent: 0 },
      { id: 'gb2', type: 'statement', content: 'For compact surface M with Gaussian curvature K:', indent: 0, delay: 400 },
      { id: 'gb3', type: 'equation', latex: '\\iint_M K\\, dA + \\int_{\\partial M} \\kappa_g\\, ds = 2\\pi\\chi(M)', indent: 1, emphasis: true },
      { id: 'gb4', type: 'annotation', content: '(κ_g = geodesic curvature, χ = Euler characteristic)', indent: 1 },
      { id: 'gb5', type: 'text', content: 'Local Gauss-Bonnet (geodesic triangle T):', indent: 0, delay: 500 },
      { id: 'gb6', type: 'equation', latex: '\\iint_T K\\, dA = (\\alpha + \\beta + \\gamma) - \\pi', indent: 1 },
      { id: 'gb7', type: 'annotation', content: 'where α, β, γ are interior angles. (Angle excess = total curvature)', indent: 1 },
      { id: 'gb8', type: 'text', content: 'Proof idea: Triangulate M into geodesic triangles.', indent: 0, delay: 400 },
      { id: 'gb9', type: 'equation', latex: 'M = T_1 \\cup T_2 \\cup \\cdots \\cup T_F \\quad (F \\text{ faces})', indent: 1 },
      { id: 'gb10', type: 'annotation', content: 'with V vertices, E edges.', indent: 1 },
      { id: 'gb11', type: 'text', content: 'Sum local Gauss-Bonnet over all triangles:', indent: 0 },
      { id: 'gb12', type: 'equation', latex: '\\sum_i \\iint_{T_i} K\\, dA = \\sum_i [(\\text{angles in } T_i) - \\pi]', indent: 1 },
      { id: 'gb13', type: 'text', content: 'Angle counting:', indent: 0, delay: 400 },
      { id: 'gb14', type: 'step', content: '• Interior vertex: angles sum to 2π', indent: 1 },
      { id: 'gb15', type: 'step', content: '• Boundary vertex: angles sum to π - (exterior angle)', indent: 1 },
      { id: 'gb16', type: 'step', content: '• Each triangle contributes π to the sum', indent: 1 },
      { id: 'gb17', type: 'equation', latex: '\\text{Total: } \\sum(\\text{angles}) = 2\\pi V_{\\text{int}} + \\sum_{\\text{bdy}}(\\pi - \\text{ext. angles})', indent: 1 },
      { id: 'gb18', type: 'text', content: 'For closed M: Σ(angles) = 2πV', indent: 0 },
      { id: 'gb19', type: 'text', content: 'Combining with Euler\'s formula V - E + F = χ(M):', indent: 0, delay: 400 },
      { id: 'gb20', type: 'equation', latex: '\\iint_M K\\, dA + \\int_{\\partial M} \\kappa_g\\, ds = 2\\pi\\chi(M)', indent: 1 },
      { id: 'gb21', type: 'text', content: 'Example: Sphere (χ=2):', indent: 0 },
      { id: 'gb22', type: 'equation', latex: '\\iint \\frac{1}{R^2}\\, dA = \\frac{4\\pi R^2}{R^2} = 4\\pi = 2\\pi(2) \\checkmark', indent: 1 },
      { id: 'gb23', type: 'conclusion', content: '□', indent: 0 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. GÖDEL'S FIRST INCOMPLETENESS THEOREM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'godel_incompleteness',
    title: 'Gödel\'s First Incompleteness Theorem',
    shortStatement: 'Con(T) ⟹ ∃φ: T ⊬ φ ∧ T ⊬ ¬φ',
    accessibleSummary: 'Gödel\'s First Incompleteness Theorem shows that any sufficiently powerful consistent formal system contains true statements it cannot prove. The proof uses Gödel numbering to construct a self-referential sentence.',
    field: 'Mathematical Logic',
    year: 1931,
    mathematician: 'Kurt Gödel',
    difficulty: 'advanced',
    estimatedDuration: 31,
    lines: [
      { id: 'gd1', type: 'title', content: 'Gödel\'s First Incompleteness Theorem', indent: 0 },
      { id: 'gd2', type: 'text', content: 'Setting: F is a formal system that is:', indent: 0, delay: 400 },
      { id: 'gd3', type: 'step', content: '(i)   Consistent (no contradictions)', indent: 1 },
      { id: 'gd4', type: 'step', content: '(ii)  Sufficiently strong (can encode basic arithmetic)', indent: 1 },
      { id: 'gd5', type: 'step', content: '(iii) Recursively axiomatized (axioms are computable)', indent: 1 },
      { id: 'gd6', type: 'text', content: 'Gödel numbering: Encode syntax as arithmetic.', indent: 0, delay: 500 },
      { id: 'gd7', type: 'step', content: '• Each symbol → a number', indent: 1 },
      { id: 'gd8', type: 'step', content: '• Each formula φ → a number ⌜φ⌝ (Gödel number)', indent: 1 },
      { id: 'gd9', type: 'step', content: '• Each proof → a number encoding sequence', indent: 1 },
      { id: 'gd10', type: 'annotation', content: 'Key: "φ is provable" becomes arithmetic predicate Prov(⌜φ⌝)', indent: 1 },
      { id: 'gd11', type: 'text', content: 'Diagonal Lemma:', indent: 0, delay: 500, emphasis: true },
      { id: 'gd12', type: 'step', content: 'For any formula ψ(x) with one free variable,', indent: 1 },
      { id: 'gd13', type: 'step', content: 'there exists sentence σ such that:', indent: 1 },
      { id: 'gd14', type: 'equation', latex: 'F \\vdash \\sigma \\leftrightarrow \\psi(\\ulcorner\\sigma\\urcorner)', indent: 2 },
      { id: 'gd15', type: 'annotation', content: '(Self-reference: σ "talks about" its own Gödel number)', indent: 2 },
      { id: 'gd16', type: 'text', content: 'Apply diagonal lemma to ψ(x) = ¬Prov(x):', indent: 0, delay: 400 },
      { id: 'gd17', type: 'equation', latex: 'F \\vdash G \\leftrightarrow \\neg\\text{Prov}(\\ulcorner G\\urcorner)', indent: 1, emphasis: true },
      { id: 'gd18', type: 'annotation', content: 'G says: "I am not provable in F"', indent: 1 },
      { id: 'gd19', type: 'text', content: 'Claim: G is undecidable (neither G nor ¬G provable).', indent: 0, delay: 500 },
      { id: 'gd20', type: 'step', content: 'Case 1: Suppose F ⊢ G', indent: 1 },
      { id: 'gd21', type: 'annotation', content: 'Then Prov(⌜G⌝) is true, so F ⊢ Prov(⌜G⌝)', indent: 2 },
      { id: 'gd22', type: 'annotation', content: 'But F ⊢ G ↔ ¬Prov(⌜G⌝), so F ⊢ ¬G', indent: 2 },
      { id: 'gd23', type: 'annotation', content: '∴ F inconsistent. Contradiction!', indent: 2 },
      { id: 'gd24', type: 'step', content: 'Case 2: Suppose F ⊢ ¬G', indent: 1 },
      { id: 'gd25', type: 'annotation', content: 'Then F ⊢ Prov(⌜G⌝)', indent: 2 },
      { id: 'gd26', type: 'annotation', content: 'If F is ω-consistent, G is actually provable', indent: 2 },
      { id: 'gd27', type: 'annotation', content: '∴ F inconsistent. Contradiction!', indent: 2 },
      { id: 'gd28', type: 'conclusion', content: '∴ G is undecidable in F, yet true (in standard model). □', indent: 0, emphasis: true },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. EULER-LAGRANGE EQUATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'euler_lagrange',
    title: 'Euler-Lagrange Equation',
    shortStatement: '∂L/∂y - d/dx(∂L/∂y\') = 0',
    accessibleSummary: 'The Euler-Lagrange equation provides the necessary condition for a function to extremize a functional integral. The derivation uses the calculus of variations and integration by parts.',
    field: 'Calculus of Variations',
    year: 1755,
    mathematician: 'Leonhard Euler & Joseph-Louis Lagrange',
    difficulty: 'intermediate',
    estimatedDuration: 26,
    lines: [
      { id: 'el1', type: 'title', content: 'Euler-Lagrange Equation', indent: 0 },
      { id: 'el2', type: 'text', content: 'Problem: Find y(x) that extremizes', indent: 0, delay: 400 },
      { id: 'el3', type: 'equation', latex: 'J[y] = \\int_a^b L(x, y, y\')\\, dx', indent: 1, emphasis: true },
      { id: 'el4', type: 'annotation', content: 'with boundary conditions y(a) = y_a, y(b) = y_b fixed.', indent: 1 },
      { id: 'el5', type: 'text', content: 'Method of variations:', indent: 0, delay: 500 },
      { id: 'el6', type: 'step', content: 'Let y(x) be an extremizer. Consider perturbations:', indent: 1 },
      { id: 'el7', type: 'equation', latex: 'y_\\varepsilon(x) = y(x) + \\varepsilon \\cdot \\eta(x)', indent: 1 },
      { id: 'el8', type: 'annotation', content: 'where η(a) = η(b) = 0 (preserves boundary conditions)', indent: 1 },
      { id: 'el9', type: 'annotation', content: 'and ε is a small parameter.', indent: 1 },
      { id: 'el10', type: 'text', content: 'Necessary condition:', indent: 0, delay: 400 },
      { id: 'el11', type: 'equation', latex: '\\left.\\frac{d}{d\\varepsilon} J[y_\\varepsilon]\\right|_{\\varepsilon=0} = 0', indent: 1 },
      { id: 'el12', type: 'text', content: 'Compute:', indent: 0 },
      { id: 'el13', type: 'equation', latex: 'J[y_\\varepsilon] = \\int_a^b L(x, y+\\varepsilon\\eta, y\'+\\varepsilon\\eta\')\\, dx', indent: 1 },
      { id: 'el14', type: 'equation', latex: '\\frac{d}{d\\varepsilon} J[y_\\varepsilon] = \\int_a^b \\left[\\frac{\\partial L}{\\partial y} \\cdot \\eta + \\frac{\\partial L}{\\partial y\'} \\cdot \\eta\'\\right] dx', indent: 1 },
      { id: 'el15', type: 'text', content: 'Integration by parts on second term:', indent: 0, delay: 500 },
      { id: 'el16', type: 'equation', latex: '\\int_a^b \\frac{\\partial L}{\\partial y\'} \\cdot \\eta\'\\, dx = \\left[\\frac{\\partial L}{\\partial y\'} \\cdot \\eta\\right]_a^b - \\int_a^b \\frac{d}{dx}\\left(\\frac{\\partial L}{\\partial y\'}\\right) \\cdot \\eta\\, dx', indent: 1 },
      { id: 'el17', type: 'annotation', content: 'Boundary terms vanish since η(a) = η(b) = 0', indent: 1 },
      { id: 'el18', type: 'text', content: 'Therefore:', indent: 0, delay: 400 },
      { id: 'el19', type: 'equation', latex: '0 = \\int_a^b \\left[\\frac{\\partial L}{\\partial y} - \\frac{d}{dx}\\left(\\frac{\\partial L}{\\partial y\'}\\right)\\right] \\cdot \\eta(x)\\, dx', indent: 1 },
      { id: 'el20', type: 'text', content: 'Since this holds for ALL admissible η(x):', indent: 0 },
      { id: 'el21', type: 'equation', latex: '\\boxed{\\frac{\\partial L}{\\partial y} - \\frac{d}{dx}\\left(\\frac{\\partial L}{\\partial y\'}\\right) = 0}', indent: 1, emphasis: true },
      { id: 'el22', type: 'text', content: 'The Euler-Lagrange equation!', indent: 0 },
      { id: 'el23', type: 'annotation', content: 'Applications: Classical mechanics, geodesics, minimal surfaces, optics...', indent: 1 },
      { id: 'el24', type: 'conclusion', content: '□', indent: 0 },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get a random proof using crypto random for true variety
 */
export function getRandomProof(): ProofData {
  const randomIndex = typeof window !== 'undefined' && window.crypto
    ? window.crypto.getRandomValues(new Uint32Array(1))[0] % PROOFS.length
    : Math.floor(Math.random() * PROOFS.length);
  return PROOFS[randomIndex];
}

/**
 * Get a proof by ID
 */
export function getProofById(id: string): ProofData | undefined {
  return PROOFS.find(p => p.id === id);
}

/**
 * Get all proof IDs
 */
export function getProofIds(): string[] {
  return PROOFS.map(p => p.id);
}

/**
 * Calculate total estimated duration for all lines in a proof
 */
export function calculateProofDuration(proof: ProofData): number {
  const baseLineTime = (proof.estimatedDuration * 1000) / proof.lines.length;
  return proof.lines.reduce((total, line) => {
    return total + (line.duration || baseLineTime) + (line.delay || 0);
  }, 0);
}

/**
 * Get proofs by difficulty level
 */
export function getProofsByDifficulty(difficulty: 'accessible' | 'intermediate' | 'advanced'): ProofData[] {
  return PROOFS.filter(p => p.difficulty === difficulty);
}

/**
 * Get proofs by mathematical field
 */
export function getProofsByField(field: string): ProofData[] {
  return PROOFS.filter(p => p.field.toLowerCase().includes(field.toLowerCase()));
}
