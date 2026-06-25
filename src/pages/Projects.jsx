import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Code, ExternalLink, Github } from "lucide-react";

const Projects = () => {
  // State to track which project's code is expanded
  const [expandedCodes, setExpandedCodes] = useState({
    project1: false,
    project2: false,
    project3: false,
  });

  // Add scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.section-animate');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Toggle function for expanding/collapsing code
  const toggleCode = (projectId) => {
    setExpandedCodes(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Project data
  const projects = [
    {
      id: "project1",
      title: "SMS Spam Filter",
      description: "A text classification system that categorizes SMS messages to identify likely scam/spam messages.",
      technologies: ["Python", "Pandas", "NLTK", "Scikit-Learn", "Matplotlib", "Jupyter Notebook"],
      notebookType: "pdf",
      pdfPath: "/proj2.pdf",
    },
    {
      id: "project2",
      title: "Plane Crash Analysis",
      description: "A comprehensive historical analysis of plane crashes.",
      technologies: ["Python", "Pandas", "Scikit-Learn", "Seaborn", "NumPy", "Statsmodels", "Jupyter Notebook"],
      notebookType: "pdf",
      pdfPath: "/project4.pdf",
    },
    {
      id: "project3",
      title: "Car Price Prediction",
      description: "A data analysis project using Python and pandas to model and predict used-car prices.",
      technologies: ["Python", "Pandas", "Scikit-Learn", "NumPy", "RandomForest", "Pipeline", "Pickle"],
      githubLink: "https://github.com/jaredf96/4122-project/tree/main",
      notebookType: "code",
      notebookCode: `# Car Price Prediction — Ford & Volkswagen
import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
import pickle

# Load and combine the datasets
df_ford = pd.read_csv('ford.csv')
df_volkswagen = pd.read_csv('vw.csv')
df_merged = pd.concat([df_ford, df_volkswagen], ignore_index=True)

# Split features and target
X = df_merged.drop('price', axis=1)
y = df_merged['price']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=30)

# Preprocessing pipeline
numeric_columns = ['year', 'mileage', 'tax', 'mpg', 'engineSize']
categorical_columns = ['model', 'transmission', 'fuelType']

preprocessor = ColumnTransformer(transformers=[
    ('numeric', StandardScaler(), numeric_columns),
    ('categorical', OneHotEncoder(handle_unknown='ignore'), categorical_columns),
])

# Train a random forest regressor
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(random_state=30)),
])
model.fit(X_train, y_train)

# Evaluate with MAE and R^2
y_pred = model.predict(X_test)
print("Mean Absolute Error:", mean_absolute_error(y_test, y_pred))
print("R-squared (R^2) Score:", r2_score(y_test, y_pred))
# Mean Absolute Error: 971.86
# R-squared (R^2) Score: 0.953

# Save the trained model
with open('ford_and_volkswagen_price_predictor.pkl', 'wb') as f:
    pickle.dump(model, f)
`
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-surface text-text">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Projects</h1>
        <p className="text-lg text-muted mb-12 text-center">A selection of my coursework and personal projects.</p>

        <div className="grid grid-cols-1 gap-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-surface-light rounded-base overflow-hidden shadow-soft transition-all duration-(--duration-medium) hover:shadow-lg section-animate opacity-0"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                <p className="text-muted mb-4">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project links - render independently */}
                {(project.githubLink || project.liveLink) && (
                  <div className="flex gap-4 mb-6">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted hover:text-accent transition-colors duration-(--duration-medium)"
                      >
                        <Github size={18} />
                        <span>View Code</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted hover:text-accent transition-colors duration-(--duration-medium)"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Code toggle button */}
                <button
                  onClick={() => toggleCode(project.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-base bg-accent text-white hover:bg-accent-hover transition-colors duration-(--duration-medium)"
                >
                  <Code size={18} />
                  <span>{expandedCodes[project.id] ? 'Hide' : 'View'} Jupyter Notebook</span>
                  {expandedCodes[project.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {/* Notebook display - code or PDF based on type */}
                {expandedCodes[project.id] && (
                  <div className="mt-4 transition-all duration-(--duration-medium) ease-snappy">
                    {project.notebookType === "pdf" ? (
                      <div>
                        <div className="h-[600px] rounded-base overflow-hidden border border-muted/20">
                          <iframe
                            src={project.pdfPath}
                            className="w-full h-full"
                            title={`${project.title} Notebook`}
                          />
                        </div>
                        <a
                          href={project.pdfPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-sm text-muted hover:text-accent transition-colors duration-(--duration-medium)"
                        >
                          <ExternalLink size={16} />
                          <span>Open PDF in new tab</span>
                        </a>
                      </div>
                    ) : (
                      <pre className="p-4 rounded-base bg-gray-900 text-gray-100 text-sm">{project.notebookCode}</pre>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;