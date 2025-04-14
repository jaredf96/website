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
      description: "A text classification system that categorizes SMS text messages into different sentiment categories to identify likely scam/spam messages.",
      image: "/project1.jpg", // Replace with your actual image path
      technologies: ["Python", "Pandas", "NLTK", "Scikit-Learn", "Matplotlib", "Jupyter Notebook"],
      notebookType: "pdf",
      pdfPath: "/proj2.pdf", // Replace with your actual PDF path
    },
    {
      id: "project2",
      title: "Plane Crash Analysis",
      description: "Comprehensive analysis on plane crashes historically",
      image: "/project2.jpg", // Replace with your actual image path
      technologies: ["Python", "Pandas", "Scikit-Learn", "Seaborn", "NumPy", "Statsmodels", "Jupyter Notebook"],
      notebookType: "pdf",
      pdfPath: "/project4.pdf", // Replace with your actual PDF path
    },
    {
      id: "project3",
      title: "Car Price Prediction",
      description: "A comprehensive data analysis project using Python and pandas to analyze and visualize trends in car markets.",
      image: "/project3.jpg", // Replace with your actual image path
      technologies: ["Python", "Pandas", "Scikit-Learn", "NumPy", "RandomForest", "Pipeline", "Pickle"],
      githubLink: "https://github.com/jaredf96/4122-project/tree/main",
      notebookType: "code",
      notebookCode: `# Car Price Prediction
import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
import pickle
Loading the datasets

df_ford = pd.read_csv('ford.csv')
df_volkswagen = pd.read_csv('vw.csv')
Combining Ford and Volkswagen datasets

df_merged = pd.concat([df_ford, df_volkswagen], ignore_index=True)
Preprocess the data

X = df_merged.drop('price', axis=1)
Y = df_merged['price']
Split the data into training and testing sets

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=30)
Preprocessing pipeline

numeric_columns = ['year', 'mileage', 'tax', 'mpg', 'engineSize']
categorical_columns = ['model', 'transmission', 'fuelType']

preprocessor = ColumnTransformer(
    transformers=[
        ('numeric', StandardScaler(), numeric_columns),
        ('categorical', OneHotEncoder(handle_unknown='ignore'), categorical_columns)
    ])
Create a pipeline with a random forest regressor

model = Pipeline(steps=[('preprocessor', preprocessor),
                           ('regressor', RandomForestRegressor(random_state=30))])
Train the model

model.fit(X_train, Y_train)
Pipeline(steps=[('preprocessor',
                 ColumnTransformer(transformers=[('numeric', StandardScaler(),
                                                  ['year', 'mileage', 'tax',
                                                   'mpg', 'engineSize']),
                                                 ('categorical',
                                                  OneHotEncoder(handle_unknown='ignore'),
                                                  ['model', 'transmission',
                                                   'fuelType'])])),
                ('regressor', RandomForestRegressor(random_state=30))])
Evaluating the model using MAE and R2

Y_pred = model.predict(X_test)
mae = mean_absolute_error(Y_test, Y_pred)
print("Mean Absolute Error: " + str(mae))

r2 = r2_score(Y_test, Y_pred)
print("R-squared (R^2) Score: "+str(r2))
Mean Absolute Error: 971.862606830212
R-squared (R^2) Score: 0.9530600194914016
Save the trained model

with open('ford_and_Volkswagen_price_predictor.pkl', 'wb') as f:
    pickle.dump(model, f)
`
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-[--color-surface] text-[--color-text]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Projects</h1>
        <p className="text-lg text-[--color-muted] mb-12 text-center">Here are some of my course works.</p>

        <div className="grid grid-cols-1 gap-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[--color-surface-light] rounded-[--radius-base] overflow-hidden shadow-[--shadow-soft] transition-all duration-[--duration-medium] hover:shadow-lg section-animate opacity-0"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                <p className="text-[--color-muted] mb-4">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-full bg-[--color-accent]/10 text-[--color-accent]"
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
                        className="flex items-center gap-2 text-[--color-muted] hover:text-[--color-accent] transition-colors duration-[--duration-medium]"
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
                        className="flex items-center gap-2 text-[--color-muted] hover:text-[--color-accent] transition-colors duration-[--duration-medium]"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-[--radius-base] bg-[--color-accent] text-white hover:bg-[--color-accent-hover] transition-colors duration-[--duration-medium]"
                >
                  <Code size={18} />
                  <span>{expandedCodes[project.id] ? 'Hide' : 'View'} Jupyter Notebook</span>
                  {expandedCodes[project.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {/* Notebook display - code or PDF based on type */}
                {expandedCodes[project.id] && (
                  <div className="mt-4 transition-all duration-[--duration-medium] ease-[--ease-snappy]">
                    {project.notebookType === "pdf" ? (
                      <div className="h-96 rounded-[--radius-base] overflow-hidden border border-gray-200">
                        <iframe
                          src={project.pdfPath}
                          className="w-full h-full"
                          title={`${project.title} Notebook`}
                        />
                      </div>
                    ) : (
                      <div className="p-4 rounded-[--radius-base] bg-gray-900 text-white font-mono text-sm overflow-x-auto">
                        <pre>{project.notebookCode}</pre>
                      </div>
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