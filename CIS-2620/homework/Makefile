# ---- Configurable Parameters ----
PENNKEY := aliu
HWNUM   ?= 1
BASENAME := cis-2620-hw$(HWNUM)-$(PENNKEY)
OUTDIR := .latex
TEX_TEMPLATE := hw-template.tex
TEX_OUTPUT := $(BASENAME).tex
PDF_OUTPUT := $(OUTDIR)/$(BASENAME).pdf

# ---- Main Target ----
all: $(PDF_OUTPUT)

# ---- Step 1: Preprocess Template ----
$(TEX_OUTPUT): $(TEX_TEMPLATE)
	@echo "Generating $@ from template..."
	@sed 's/\\newcommand{\\HomeworkNo}{[^}]*}/\\newcommand{\\HomeworkNo}{$(HWNUM)}/' $< > $@

# ---- Step 2: Compile LaTeX with latexmk ----
$(PDF_OUTPUT): $(TEX_OUTPUT)
	@echo "Compiling LaTeX for HW$(HWNUM)..."
	@mkdir -p $(OUTDIR)
	@latexmk -pdf -synctex=1 -interaction=nonstopmode -file-line-error \
	  -outdir=$(OUTDIR) $(TEX_OUTPUT)

# ---- Cleanup ----
clean:
	@latexmk -C

purge: clean
	@trash .latex/

.PHONY: all clean purge