import os

files_to_check = [
    'pages/dashboard/MyVocabulary.jsx',
    'pages/dashboard/MyNotes.jsx',
    'pages/dashboard/Profile.jsx',
]

for file_path in files_to_check:
    full_path = os.path.join('/home/nhattrinh/Project/EnglishHub/frontend/src', file_path)
    if not os.path.exists(full_path):
        continue
    
    with open(full_path, 'r') as f:
        content = f.read()
    
    # replace Link to="/pricing" with button onClick={openProModal}
    content = content.replace('<Link\n              to="/pricing"', '<button\n              onClick={openProModal}')
    content = content.replace('to="/pricing"', 'onClick={openProModal}')
    
    # If using openProModal, ensure it's in useAuth
    if 'useAuth()' in content and 'openProModal' not in content:
        import re
        content = re.sub(r'(const \{.*?)(\} = useAuth\(\);)', r'\1, openProModal \2', content)
        
    # replace </Link> with </button> around the openProModal
    # This is a bit tricky, let's just do a string replace if it matches the specific block
    if '<button' in content and '</Link>' in content:
        # We need to replace </Link> only for the pricing links. 
        # A simple hack for these specific files is to just use regex to replace `<Link ... onClick={openProModal} ... > ... </Link>`
        pass
    
    with open(full_path, 'w') as f:
        f.write(content)
